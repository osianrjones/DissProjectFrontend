import { getContractInstance } from "../Helper_Functions/ContractConnection";
import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Web3 from "web3";
import Countdown from "./Countdown";
import {Box, Button} from "@mui/material";
import PollIcon from "@mui/icons-material/Poll";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useInView} from "react-intersection-observer";
import {getAbout} from "../Helper_Functions/MeetCandidates";

const Candidates = ({accountNumber}) => {
    const navigate = useNavigate();
    const [contractAddress, setContractAddress] = useState(null);
    const [proposals, setProposals] = useState(null);
    const targetDate = new Date('2024-12-31T23:59:59');
    const account = accountNumber;

    useEffect( () => { 
        async function fetchData() {
            try {
                const web3 = new Web3(window.ethereum);

                const contract = await getContractInstance();

                // Check deployment and block state
                const code = await web3.eth.getCode(contract.options.address);
                if (code === "0x") {
                    console.error("Contract not deployed at this address.");
                    return;
                }

                const latestBlock = await web3.eth.getBlockNumber();
                console.log("Latest Block:", latestBlock);

                console.log("Contract: =")
                console.log(contract)
                setContractAddress(contract.options.address);
                console.log("Contract Address =" + contractAddress)
                const proposals = await contract.methods.getAllProposals().call();
                const proposalList = [];
                proposals.forEach((proposal) => {
                    const trimmed = proposal.name.replace(/0+$/, '');
                    const decodedString = web3.utils.hexToUtf8(trimmed);
                    proposalList.push(decodedString);
                });
                console.log(proposalList);
                setProposals(proposalList);
            } catch (err) {
                console.log(err);
                //navigate('/');
            }   
        }
        fetchData();
    }, []
  )
    return (
            proposals ? (
             proposals.map((proposal, index) => (
                 index % 2 == 0 ? (
                     <div className="odd relative">
                         <ProposalOdd key={index} index={index} name={proposal} account={accountNumber}/>
                         <div className="absolute bottom-0">
                             <Box
                                 component="img"
                                 src="../resources/chain.png"
                             />
                         </div>
                     </div>
                 ) : (
                     <div className="even relative">
                         <ProposalEven key={index} index={index} name={proposal} account={accountNumber}/>
                         <div className="absolute bottom-0">
                             <Box
                                 component="img"
                                 src="../resources/chain.png"
                             />
                         </div>
                     </div>
                 )
             ))) : (
                <div>Loading..</div>
            )
    );

}

const ProposalOdd = ({index, name, account}) => {
    const {ref, inView} = useInView({
        threshold: 0.3,
    });

    const CandidateImage = ({name}) => {
        try {
            const imagePath = require(`../resources/${name}.jpg`);
            return <img src={imagePath} alt={name} />;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            ref={ref}
            className={`transition-opacity duration-1000 ${ inView ? "opacity-100" : "opacity-0"
            } flex flex-col justify-center w-1/2 ml-auto mr-auto pl-1 pr-10 mb-14 min-h-1/2 rounded-lg shadow-2xl bg-slate-500 relative`}>
            <div className="flex items-center min-h-full w-1/2 ml-1 mt-2 mb-2">
                <CandidateImage name={name}
                     className="rounded-lg shadow h-5/6 object-cover mt-2 mb-2"/>
            </div>
            <div className="proposal absolute top-4 right-4 m-4 mr-14 text-5xl text-white font-bold">{name}</div>
            <div className="absolute right-0 top-24 w-1/2 h-1/2 text-white text-xl">{getAbout(index)?.about}
            </div>
            <div className="absolute bottom-0 right-0 m-10 transition-transform duration-300 hover:scale-105">
                <Link to="/vote" state={{accountNumber: account}}>
                <Button variant="outlined"
                        size={"large"}
                        endIcon={<ArrowForwardIcon/>}
                        sx={{color: "white" , borderColor: 'white', "&:hover" : {backgroundColor: '#5ebc67'} }}>
                    Vote for Candidate
                </Button>
                </Link>
            </div>
        </div>
    );
};

const ProposalEven = ({index, name, account}) => {
    const {ref, inView} = useInView({
        threshold: 0.3,
    });

    const CandidateImage = ({name}) => {
        try {
            const imagePath = require(`../resources/${name}.jpg`);
            return <img src={imagePath} alt={name} />;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            ref={ref}
            className={`transition-opacity duration-1000 ${ inView ? "opacity-100" : "opacity-0"
            } flex justify-center w-1/2 ml-auto mr-auto pl-5 pr-1 mb-14 min-h-1/2 rounded-lg shadow-2xl bg-slate-500 relative`}>
            <div className="flex items-center min-h-full w-1/2 ml-auto mr-1 mt-2 mb-2">
                <CandidateImage name={name}
                     className="rounded-lg shadow h-5/6 object-cover mt-1 mb-1"/>
            </div>
            <div className="proposal absolute top-4 left-4 m-4 ml-14 text-5xl text-white font-bold">{name}</div>
            <div className="absolute left-1 top-24 w-1/2 h-1/2 text-white text-xl">{getAbout(index)?.about}
            </div>
            <div className="absolute bottom-0 left-0 m-10 transition-transform duration-300 hover:scale-105">
                <Link to="/vote" state={{accountNumber: account}}>
                <Button variant="outlined"
                        size={"large"}
                        endIcon={<ArrowForwardIcon/>}
                sx={{ color: "white", borderColor: 'white', "&:hover" : {backgroundColor: '#5ebc67'} }}>
                    Vote for Candidate
                </Button>
                </Link>
            </div>
        </div>
    );
};

export default Candidates;