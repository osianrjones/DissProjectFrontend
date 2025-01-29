import React, { useState, useEffect } from 'react';
import FlipDigit from './FlipDigit';
import {Button} from "@mui/material";
import PollIcon from '@mui/icons-material/Poll';
import DoneIcon from '@mui/icons-material/Done';
import Web3 from "web3";
import {getContractInstance} from "../Helper_Functions/ContractConnection";
import {useInView} from 'react-intersection-observer';
import {Link, useLocation} from "react-router-dom";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const {ref, inView} = useInView({
     threshold: 0.3,
  });

  const [registered, setRegistered] = useState(false);
  const [account, setAccount] = useState(null);
  const location = useLocation();

  useEffect(() => {
      const intervalId = setInterval(() => {
          const now = new Date().getTime();
          const distance = targetDate - now;

          if (distance < 0) {
              clearInterval(intervalId);
              setTimeLeft({days: '00', hours: '00', minutes: '00', seconds: '00'});
          } else {
              const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
              const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

              setTimeLeft({days, hours, minutes, seconds});
          }
      }, 1000);

      async function fetchRegistered() {
          const web3 = new Web3(window.ethereum);

          const contract = await getContractInstance();
          const accounts = await web3.eth.getAccounts();
          console.log("accounts:")
          console.log(accounts)
          const currentAddress = accounts[0];
          console.log(currentAddress);
          setRegistered(await contract.methods.hasRegistered(currentAddress).call());
      }
      const accountNumber = location.state.accountNumber;
      setAccount(accountNumber);
      fetchRegistered();
      return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
      <div
          id="countdown"
          ref={ref}
          className={`transition-opacity duration-1000 ${ inView ? "opacity-100" : "opacity-0"
              } flex flex-col bg-slate-500 mt-2 mb-14 ml-auto mr-auto w-1/2 rounded-xl shadow-lg items-center justify-center relative`}>
          <div className="text-white text-3xl font-bold align-text-bottom pt-10">
              <u><h1>Election Countdown</h1></u>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-10 rounded-xl">
              <div className="flex flex-col items-center">
                  <div className="flex space-x-1 pt-5">
                      <FlipDigit digit={timeLeft.days[0]}/>
                      <FlipDigit digit={timeLeft.days[1]}/>
                  </div>
                  <span className="text-lg font-semibold mt-2 text-white">Days</span>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="flex flex-col items-center">
                  <div className="flex space-x-1 pt-5">
                      <FlipDigit digit={timeLeft.hours[0]}/>
                      <FlipDigit digit={timeLeft.hours[1]}/>
                  </div>
                  <span className="text-lg font-semibold mt-2 text-white">Hours</span>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="flex flex-col items-center">
                  <div className="flex space-x-1 pt-5">
                      <FlipDigit digit={timeLeft.minutes[0]}/>
                      <FlipDigit digit={timeLeft.minutes[1]}/>
                  </div>
                  <span className="text-lg font-semibold mt-2 text-white">Minutes</span>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="flex flex-col items-center">
                  <div className="flex space-x-1 pt-5">
                      <FlipDigit digit={timeLeft.seconds[0]}/>
                      <FlipDigit digit={timeLeft.seconds[1]}/>
                  </div>
                  <span className="text-lg font-semibold mt-2 text-white">Seconds</span>
              </div>
          </div>
          <div className="mt-10 pb-6">
              {registered ? (
                  <div>
                      <div>
                          <button className="h-1/2 text-white mt-16 rounded text-5xl bg-gray-400 cursor-default">
                              <div className="flex flex-row pr-2 pl-2 pb-2 pt-2 items-center justify-center">
                                  <p className="ml-2">Registered</p>
                                  <DoneIcon sx={{fontSize: '48px'}}/>
                              </div>
                          </button>
                      </div>
                  </div>
              ) : (
                  <div>
                      <Link to={"/register"} state={{accountNumber: account}}>
                      <button className="h-1/2 mt-16 rounded text-5xl text-white transition-transform duration-300 hover:scale-105"
                              style={{backgroundColor: '#5ebc67'}}>
                          <div className="flex flex-row pr-2 pl-2 pb-2 pt-2 items-center justify-center">
                              <p className="ml-2 mr-2">Register To Vote</p>
                              <PollIcon sx={{fontSize: '48px'}}/>
                          </div>
                      </button>
                      </Link>
                  </div>
              )}
          </div>
          <div className="absolute bottom-1 text-gray-400">
              <Link to={"/about"}><p>How it works?</p></Link>
          </div>
      </div>
  );
};

export default Countdown;

