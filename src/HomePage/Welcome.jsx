import { useLocation, useNavigate } from 'react-router-dom';
import Countdown from './Countdown'
import Login from '../LandingPage/Login';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Register from '../Registration/Register';
import Candidates from './Candidates';
import logo from '../resources/logo.png'
import {Button} from "@mui/material";
import greenSwirl from '../resources/greenSwirl.jpg';
import Footer from "./Footer";
import ShowCandidates from "./ShowCandidates";
import Title from "./Title";
import Web3 from "web3";
import Results from "../Results/Results";

const Welcome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [accountNumber, setAccountNumber] = useState(null);
    const targetDate = new Date('2025-05-01T23:59:59');
    const [electionComplete, setElectionComplete] = useState(false);

    useEffect(() => {
        async function setAccount() {
            try {
                const accountNumber = location.state.accountNumber;
                const web3 = new Web3(window.ethereum);
                const checksumAddress = web3.utils.toChecksumAddress(accountNumber);

                console.log(`Welcome account ${checksumAddress}`);
                setAccountNumber(checksumAddress);
            } catch (error) {
                //Case where user is not authenticated with an account number in URL state params
                navigate('/');
            }
        }
        setAccount();
    }, [location, navigate]);

    const checkCountdown = setInterval(() => {
        if (hasElapsed()) {
            setElectionComplete(true);
            clearInterval(checkCountdown);
        }
    }, 1000);

    const hasElapsed = () => {
        const now = new Date();
        return now >= targetDate;
    }

    return (
        <div className="relative flex flex-col min-h-screen" style={{ backgroundImage: `url(${greenSwirl})`,backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            minHeight: '100vh',
            width: '100vw',}}>
            <NavBar logo={logo} page='home' complete={true}/>
            { electionComplete ? (
                <div>
                    <Results/>
                    <div className="flex-grow">
                    </div>
                </div>
            ) : (
                <div>
                    <Title/>
                    <div className="pt-10">
                        <Countdown targetDate={targetDate}/>
                    </div>
                    <ShowCandidates/>
                    <Candidates accountNumber={accountNumber}/>
                    <div className="flex-grow">
                    </div>
                    <Footer/>
                </div>
            )}
        </div>
    )
}

export default Welcome;