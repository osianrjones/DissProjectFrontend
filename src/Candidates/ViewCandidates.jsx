import NavBar from "../HomePage/NavBar";
import greenSwirl from "../resources/greenSwirl.jpg";
import logo from "../resources/logo.png";
import Footer from "../HomePage/Footer";
import React, {useEffect, useState} from "react";
import Web3 from "web3";
import {getContractInstance} from "../Helper_Functions/ContractConnection";
import {AdsClick, Close, HowToVote, NavigateNext, Search} from "@mui/icons-material";
import {Box, Button, IconButton, InputAdornment, Modal, TextField} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

const ViewCandidates = () => {
    const [proposals, setProposals] = useState(null);
    const [filteredCandidates, setFilteredCandidates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(() => {
        async function getCandidates() {
            setLoading(true);
            const web3 = new Web3(window.ethereum);
            const contract = await getContractInstance();
            const proposals = await contract.methods.getAllProposals().call();
            const proposalList = [];
            proposals.forEach((proposal) => {
                const trimmed = proposal.name.replace(/0+$/, '');
                const decodedString = web3.utils.hexToUtf8(trimmed);
                proposalList.push(decodedString);
            });
            setProposals(proposalList);
            setFilteredCandidates(proposalList);
            setLoading(false);
            console.log(proposals);
        }
        getCandidates();
    }, []);

    const handleOpenModal = (index) => {
        setSelectedCandidate(index);
    }

    const handleCloseModal = () => {
        setSelectedCandidate(null);
    }

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        const updatedFilterCandidates = proposals.filter(candidate =>
            candidate.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setSearchTerm(newSearchTerm);
        setFilteredCandidates(updatedFilterCandidates);
    }

    const CandidateImage = ({name}) => {
        try {
            const imagePath = require(`../resources/${name}.jpg`);
            return <img src={imagePath} alt={name} />;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="relative flex min-h-screen" style={{
            backgroundImage: `url(${greenSwirl})`, backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            minHeight: '100vh',
            width: '100vw',
        }}>
            <NavBar logo={logo} page='candidates'/>
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-white font-bold text-5xl w-2/3">
                <div className="flex flex-col space-y-1 items-center">
                    <u>Candidates</u>
                    <div className="w-full">
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
                </div>
            </div>
                <div className="absolute h-2/3 w-11/12 left-1/2 transform -translate-x-1/2 flex flex-row mt-60 bg-gray-300 rounded-xl overflow-y-scroll">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 w-full p-4 auto-rows-[400px] grid-flow-row">
                            {filteredCandidates ? (
                                filteredCandidates.map((proposal, index) => (
                                        <div className="relative h-full bg-slate-500 rounded-xl transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={() => handleOpenModal(index)}>
                                            <div className="flex flex-col h-full w-1/2 rounded-2xl mt-5 ml-5">
                                            <CandidateImage name={proposal}/>
                                            </div>
                                            <div
                                                className="absolute top-4 right-4 m-4 mr-14 text-5xl text-white font-bold">{proposal}</div>
                                            <div className="absolute top-20 right-4 m-4 mr-20 text-xl text-white">
                                                Key Proposals:
                                                <ul className="list-disc">
                                                    <li>First</li>
                                                    <li>Second</li>
                                                    <li>Third</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                )) : (
                                <div>Error retrieving proposals. Please try again.</div>
                            )}
                    </div>)}
                </div>

            <Modal open={selectedCandidate !== null}
                   onClose={handleCloseModal}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '75vh',
                    bgcolor: 'grey',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '50vh',
                    height: '50vh',
                    overflowY: 'hidden',
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close/>
                    </IconButton>
                    <div className="absolute top-4 left-auto right-auto text-white font-bold text-5xl">
                        <u><p>{proposals ? (proposals[selectedCandidate]) : (<div></div>)}</p>
                        </u>
                        <div className="flex flex-col h-[90%] w-[45%] mt-3 mb-5 mr-2">
                            {proposals ? <CandidateImage name={proposals[selectedCandidate]}
                                                         className="rounded-lg shadow object-fit"/> : (<div></div>)}
                        </div>
                    </div>

                    <div
                        className="absolute top-20 right-2 w-1/2 grid grid-rows-1 text-white text-3xl">
                        <div className="flex flex-col space-y-2">
                            <p><u>About</u></p>
                            <p className="text-lg">Lorem Ipsum is
                                simply
                                dummy text of
                                the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                dummy
                                text ever
                                since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                make a
                                type specimen
                                book.</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p><u>Proposals</u></p>
                            <p className="text-xl">Key Proposals:</p>
                            <ul className="list-disc ml-10 text-lg">
                                <li>First</li>
                                <li>Second</li>
                                <li>Third</li>
                            </ul>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-xl">
                        <Link to={"/vote"} state={{accountNumber: location.state.accountNumber}}>
                        <Button variant="contained"
                                size={"large"}
                                endIcon={<NavigateNext/>}
                                sx={{
                                    backgroundColor: '#5ebc67',
                                    borderColor: 'white',
                                    "&:hover": {backgroundColor: '#419d4a',
                                        transform: 'scale(1.05)',
                                        boxShadow: 4,}
                                }}>
                            Vote
                        </Button>
                        </Link>
                    </div>
                </Box>
            </Modal>
            <Footer/>
        </div>
    )
}

export default ViewCandidates;