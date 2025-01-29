import React, { useState, useEffect } from "react";
import { getContractInstance } from "../Helper_Functions/ContractConnection";
import { useLocation, useNavigate } from 'react-router-dom';
import greenSwirl from "../resources/greenSwirl.jpg";
import Navbar from "../HomePage/NavBar";
import logo from "../resources/logo.png";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    styled
} from "@mui/material";
import PollIcon from "@mui/icons-material/Poll";
import DoneIcon from "@mui/icons-material/Done";
import Footer from "../HomePage/Footer";
import Web3 from "web3";
import DialogContext from "@mui/material/Dialog/DialogContext";
import LoadingPopup from "../Helper_Components/LoadingPopup";
import {setupRegistrationListener} from "../Helper_Functions/RegistrationListener";
import {setupTokenListener} from "../Helper_Functions/TokenListener";
import registration from "tailwind/dist/wires/api/http/v1/wsPostRead";


const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [contractAddress, setContractAddress] = useState(null);
    const [accountNumber, setAccountNumber] = useState(null);
    const [registered, setRegistered] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isPopup, setIsPopup] = useState(false);

    useEffect( () => { 
        async function fetchData() {
            try {
                const contract = await getContractInstance();
                const accountNumber = location.state.accountNumber;
                const registered = await contract.methods.hasRegistered(accountNumber).call();
                console.log(registered)
                setAccountNumber(accountNumber);
                setRegistered(registered);

                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({method: 'eth_requestAccounts'});
                const accounts = await web3.eth.getAccounts();
                setAccounts(accounts);
                setAccountNumber(accounts[0]);
                console.log(`Account number: ${accountNumber}`);
                /* contract.events.Register({
                    filter: {},
                    fromBlock: 'latest'
                }).on("data", setRegistered(true)) */
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }
        fetchData();
    }, [location, navigate]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    async function handleConfirmRegister() {
        let registrationSub = null;
        let tokenSub = null;
        try {
            registrationSub = setupRegistrationListener();
            tokenSub = setupTokenListener();

            const contract = await getContractInstance();
            console.log(contract)
            setIsPopup(true)
            const receipt = await contract.methods.register().send({from: accountNumber});
            console.log(receipt)
            setIsDisabled(true);
            setRegistered(true);
        } catch (error) {
            console.log(error);
        } finally {
            setIsPopup(false);
            setOpenDialog(false);
        }
    }

    const handleChange = (event) => {
        setAccountNumber(event.target.value);
    };

    return (
        <div className="relative flex min-h-screen" style={{
            backgroundImage: `url(${greenSwirl})`, backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            minHeight: '100vh',
            width: '100vw',
        }}>
            <Navbar logo={logo} page='register'/>
            <div className="flex flex-col space-x-4 space-y-6 items-center mt-4 mx-auto w-2/5 h-96 bg-slate-500 mt-48 rounded-lg shadow-lg text-white">
                <h1 className="text-5xl font-bold mt-4"><u>Registration</u></h1>
                <div className="text-3xl mt-10">
                    <div>
                    <p className="mt-2 mr-2 mb-1">Wallet address to register:</p>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={accountNumber}
                                    onChange={handleChange}
                                    disabled={registered}
                                    MenuProps={{
                                        sx: {
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: 'white',},
                                        }
                                    }}
                                >
                                    {accounts.map((account, index) => (
                                        <MenuItem key={index} value={account}>{account}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <p className="mt-2">Registration Status: {registered ? (<span className="text-green-400">Registered</span>) : (<span className="text-red-400">Not currently registered</span>)}</p>
                </div>
                <div>
                    {registered ? (
                        <div>
                            <div>
                                <button className="h-1/2 mt-12 rounded text-5xl bg-gray-300 cursor-default">
                                    <div className="flex flex-row pr-2 pl-2 pb-2 pt-2 items-center justify-center">
                                        <p className="ml-2">Registered</p>
                                        <DoneIcon sx={{fontSize: '48px'}}/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleOpenDialog} className={`h-1/2 mt-12 rounded text-5xl cursor-pointer transition-transform duration-300 hover:scale-105`}
                                    style={{backgroundColor: '#5ebc67'}}>
                                <div className="flex flex-row pr-2 pl-2 pb-2 pt-2 items-center justify-center">
                                    <p className="ml-2">Register</p>
                                    <PollIcon sx={{fontSize: '48px'}}/>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Dialog open={openDialog}
                    onClose={handleCloseDialog}>
                <DialogTitle>{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>You are about to register with the account: <span className="font-bold">{accountNumber}</span></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onCick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmRegister} color="primary" autoFocus>
                        Yes, Register
                    </Button>
                </DialogActions>
            </Dialog>
            <LoadingPopup open={isPopup} />
            <Footer/>
        </div>
    )
}

export default Register;