import React, {useEffect, useState} from "react";
import {getContractInstance} from "../Helper_Functions/ContractConnection";
import Web3 from "web3";
import {Button, InputAdornment, Pagination, TextField, Tooltip} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Done, HowToVote, Search} from "@mui/icons-material";
import {tokenAllowance} from "../Helper_Functions/TokenAllowance";
import approve from "../Helper_Functions/ApproveToken";
import encryptVote from "../Helper_Functions/EncryptVote";


const DisplayCandidates = (accountNumber) => {
    const [proposals, setProposals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [page, setPage] = useState(1);
    const [candidatesPerPage] = useState(3);
    const [filteredCandidates, setFilteredCandidates] = useState(null);
    const [candidates, setCandidates] = useState(null);
    const [registered, setRegistered] = useState(false);
    const [voted, setVoted] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [contract, setContract] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [icon, setIcon] = useState(<HowToVote/>);

    const indexOfLastCandidate = page * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;

    const handleOpenModal = (candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleCloseModal = () => {
        setSelectedCandidate(null);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        const indexOfLastCandidate = value * candidatesPerPage;
        const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
        setCandidates(filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate));
    };

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        const updatedFilterCandidates = proposals.filter(candidate =>
            candidate.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setSearchTerm(newSearchTerm);
        setFilteredCandidates(updatedFilterCandidates);

        console.log(newSearchTerm + " = " + updatedFilterCandidates);
        const indexOfLastCandidate = page * candidatesPerPage;
        const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
        setCandidates(updatedFilterCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate));
    }

    const handleVote = async (index) => {
            const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
            const userAddress = accountNumber.accountNumber;

            const approval = await approve(tokenAddress, contractAddress,userAddress);
            console.log(approval);

        try {
            setIsPopup(true);

            const encryptedVote = encryptVote(index);
            console.log("Encrypted Vote: ", encryptedVote);

            const gas = await contract.methods.vote(encryptedVote).estimateGas({from: accountNumber.accountNumber});
            const reciept = await contract.methods.vote(encryptedVote).send({from: accountNumber.accountNumber, gas: gas});
            setVoted(true);
            console.log(reciept);

            document.getElementById("balance").innerHTML = "0";
        } catch (error) {
            console.log(error);
        } finally {
            setIsPopup(false);
        }
    }

    const paging = {
        '& .Mui-selected': {
            bgcolor:'#d1d5db !Important' ,
        },
    }

    useEffect(  () => {
        async function fetchData() {
            try {
                setLoading(true);
                const web3 = new Web3(window.ethereum);
                let contract = await getContractInstance();
                setContract(contract);
                const proposals = await contract.methods.getAllProposals().call();
                const proposalList = [];
                proposals.forEach((proposal) => {
                    const trimmed = proposal.name.replace(/0+$/, '');
                    const decodedString = web3.utils.hexToUtf8(trimmed);
                    proposalList.push(decodedString);
                });
                setProposals(proposalList);
                setFilteredCandidates(proposalList.filter(candidate =>
                    candidate.toLowerCase().includes(searchTerm.toLowerCase())
                ));
                setCandidates(proposalList.slice(indexOfFirstCandidate, indexOfLastCandidate));
                const registered = await contract.methods.hasRegistered(accountNumber.accountNumber).call();
                setRegistered(registered);
                const hasToken = await tokenAllowance(accountNumber.accountNumber);
                setHasToken(hasToken);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
       fetchData();
    }, [])

    const CandidateImage = ({name}) => {
        try {
            const imagePath = require(`../resources/${name}_small.jpg`);
            return <img src={imagePath} alt={name} />;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="absolute w-2/3 left-1/2 transform -translate-x-1/2 mt-36 mb-10">

                <TextField
                    fullWidth
                    label="Search candidates"
                    variant="filled"
                    margin="normal"
                    onChange={handleSearchChange}
                    sx={{backgroundColor: '#d1d5db'}}
                    InputProps={{startAdornment: (
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                        )}}
                />
            </div>
            <div className="absolute h-2/3 w-11/12 left-1/2 transform -translate-x-1/2 flex flex-row mt-60 bg-gray-300 rounded-xl">
                {loading ? (
                        <div>Loading...</div>
                    ) :
                    <div className="grid grid-cols-3 gap-4 w-full p-4">
                        {candidates.map((proposal, index) => (
                        <div className="relative bg-slate-500 my-2 pb-10 w-full rounded-lg flex flex-col items-center justify-between h-full">
                            <div>
                                <div
                                    className="absolute top-4 left-4 m-4 mr-14 text-5xl text-white font-bold">{proposal}</div>
                            </div>
                            <div className="absolute flex top-28 left-auto right-auto w-full h-2/3 ml-16">
                                <CandidateImage name={proposal} style={{width: '40px !Important', height: '40px !Important'}} />
                            </div>
                                <div className="absolute bottom-0 right-0 m-10">
                                    {voted ? (
                                        <Tooltip title={"Vote has been cast."}>
                                            <Button variant="contained"
                                                    id={index}
                                                    size={"large"}
                                                    endIcon={<HowToVote/>}
                                                    disabled={true}
                                                    sx={{
                                                        backgroundColor: '#5ebc67',
                                                        borderColor: 'white',
                                                        '&.Mui-disabled': {
                                                            backgroundColor: '#d1d5db',
                                                        },
                                                        "&:hover": {backgroundColor: '#419d4a',
                                                            transform: 'scale(1.05)',
                                                            boxShadow: 3,}
                                                    }}>
                                                Cast Vote
                                            </Button>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title={!registered ? "Please register to vote first." : ""}>
                                        <Button id={index}
                                                variant="contained"
                                                size={"large"}
                                                endIcon={icon}
                                                disabled={!hasToken}
                                                onClick={() => handleVote(index)}
                                                sx={{
                                                    backgroundColor: '#5ebc67',
                                                    borderColor: 'white',
                                                    '&.Mui-disabled': {
                                                        backgroundColor: '#d1d5db',
                                                    },
                                                    "&:hover": {backgroundColor: '#419d4a',
                                                        transform: 'scale(1.05)',
                                                        boxShadow: 3,}
                                                }}>
                                            Cast Vote
                                        </Button>
                                        </Tooltip>
                                    )}
                                </div>
                        </div>
                    ))}
                    </div>
                }

            </div>
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
                {loading ?  (<div></div>) : (
            <Pagination
                count={Math.ceil(filteredCandidates.length / candidatesPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={paging}
            />
                )
                }
            </div>
        </div>
    )
}

export default DisplayCandidates;