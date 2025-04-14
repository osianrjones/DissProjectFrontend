import logo from "../resources/logo.png";
import Navbar from "../HomePage/NavBar";
import React, {useEffect, useState} from "react";
import Web3 from "web3";
import {getContractInstance} from "../Helper_Functions/ContractConnection";
import LineAndBarGraph from "../Helper_Components/LineAndBarGraph";
import decryptVotes from "../Helper_Functions/DecryptVote";

const Results = () => {
    const [winner, setWinner] = useState("Placeholder");
    const [data, setData] = useState(null);
    const [labels, setLabels] = useState(null);

    useEffect(() => {
        async function loadWinner() {
            const web3 = new Web3(window.ethereum);

            const contract = await getContractInstance();

            /*
            const winner = await contract.methods.winningProposal().call();
            const trimmed = winner.replace(/0+$/, '');
            const readable = web3.utils.hexToUtf8(trimmed);
            const proposals = await contract.methods.getAllProposals().call();
            const totalCount = [];
            proposals.forEach((proposal) => {
                totalCount.push(Number(proposal.count));
            })
            const proposalList = [];
            proposals.forEach((proposal) => {
                const trimmed = proposal.name.replace(/0+$/, '');
                const decodedString = web3.utils.hexToUtf8(trimmed);
                proposalList.push(decodedString);
            });
            setData(totalCount)
            setLabels(proposalList);
            setWinner(readable);
            */
            const encryptedVotes = await contract.methods.getAllEncryptedVotes().call();
            const decryptedVotes = decryptVotes(encryptedVotes);
            setLabels(Array.from(decryptedVotes.keys()));
            setData(Array.from(decryptedVotes.values()));

            let maxKey = null;
            let maxValue = -Infinity;
            decryptedVotes.forEach((value, key) => {
                if (value > maxValue) {
                    maxValue = value;
                    maxKey = key;
                }
            })
            setWinner(maxKey)
            console.log(decryptedVotes);
        }
        loadWinner();
    }, []);

    const CandidateImage = ({name}) => {
        try {
            const imagePath = require(`../resources/${name}_small.jpg`);
            return <img src={imagePath} alt={name} width={450} height={450} className="mb-2 rounded-xl shadow-lg" />;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 pb-5 justify-center items-center text-white font-bold text-6xl">
                <u>Election Results</u>
            </div>
            <div className="absolute top-52 mb-10 left-1/2 transform -translate-x-1/2 bg-slate-500 w-2/3 rounded-xl shadow ">
                <div className="flex flex-col justify-center items-center text-white font-bold">
                    <u className="text-6xl mt-3">Winner</u>
                    <p className="text-5xl mt-6 mb-2">{winner}</p>
                    <CandidateImage name={winner}/>
                </div>
            </div>
        </div>
        )
}

export default Results;