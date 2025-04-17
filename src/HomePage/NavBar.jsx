import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Button,
    IconButton,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    ClickAwayListener,
    Tooltip,
    Portal
} from '@mui/material';
import { Home as HomeIcon, People as PeopleIcon, Info as InfoIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import {Outlet, Link, useLocation, useNavigate} from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

import {getContractInstance} from "../Helper_Functions/ContractConnection";
import NotificationBell from "../Helper_Components/NotificationBell";
import {setupRegistrationListener} from "../Helper_Functions/RegistrationListener";
import {setupTokenListener} from "../Helper_Functions/TokenListener";
import {tokenBalance} from "../Helper_Functions/TokenBalance";
import approve from "../Helper_Functions/ApproveToken";
import {tokenAllowance} from "../Helper_Functions/TokenAllowance";
import {usePopper} from "react-popper";

export default function Navbar({ logo, page, complete }) {
    const [selectedButton, setSelectedButton] = useState('home');
    const [accountNumber, setAccount] = useState(null);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedPage, setSelectedPage] = useState(page);
    const location = useLocation();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [balance, setBalance] = useState(0);
    const tooltip = "Once registered, you will receive a voting token which can be used to cast your vote."

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()

    let { styles, attributes } = usePopper(referenceElement, popperElement,
        { placement: "bottom-start",
        modifiers: [
        {
            name: 'offset',
            options: {
                offset: [-360, 10],
            },
        },
        {
            name: 'preventOverflow',
            options: {
                boundary: 'viewport',
                padding: 24,
            },
        },
        {
            name: 'flip',
            options: {
                fallbackPlacements: ['top-start', 'top-end', 'left', 'right'],
            },
        },
        ],
    });

    useEffect(() => {
        document.getElementById("composition-button").click();
        async function fetchBalance(accountNumber) {
            if (accountNumber !== undefined) {
                const balance = await tokenAllowance(accountNumber);
                if (balance) {
                    setBalance(1);
                } else {
                    setBalance(0);
                }
                console.log("User has a token: ", balance);
            }
        }
        try {
            const accountNumber = location.state.accountNumber;
            setAccount(accountNumber);

            if (accountNumber) {
                fetchBalance(accountNumber);
            }

            if (page === 'home') {
                setSelectedButton('home');
                setSelectedPage('home');
            } else if (page === 'register') {
                setSelectedButton('register');
                setSelectedPage('register')
            } else if (page === 'candidates') {
                setSelectedButton('candidates');
                setSelectedPage('candidates')
            } else if (page === 'vote') {
                setSelectedButton('vote');
                setSelectedPage('vote')
            }
            fetchBalance();
        } catch (error) {
            navigate('/')
        }
    }, [location, navigate, page])


    useEffect(() => {
        window.sessionStorage.setItem("accountNumber", accountNumber);
    }, [accountNumber]);


    function handleLogout() {
        window.localStorage.clear();
        navigate('/')
    }

    const handleClick = (button) => {
        setSelectedButton(button);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    return (
        <nav className="fixed overflow-hidden flex items-center justify-between bg-slate-500 top-0 w-full px-4 z-50">
            <div className="flex items-center h-full">
                <Link to="/Home" state={{accountNumber: accountNumber}}> <img src={logo} alt="logo" className="h-20 w-auto" /> </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex space-x-2 mr-40">
                        {selectedPage !== 'home' ? (
                            <Link to="/home" state={{accountNumber: accountNumber}}>
                            <NavButton
                                icon={<HomeIcon/>}
                                label="Home"
                                disabled={complete}
                                isSelected={selectedButton === 'home'}
                                onClick={() => handleClick('home')}
                            />
                            </Link>
                        ) : (
                            <div></div>
                        ) }
                    {selectedPage !== 'register' ? (
                        <Link to="/register" state={{accountNumber: accountNumber}}>
                            <NavButton
                                icon={<PollIcon/>}
                                label="Register"
                                disabled={complete}
                                isSelected={selectedButton === 'register'}
                                onClick={() => handleClick('register')}
                            />
                        </Link>
                    ) : (<div></div>)}
                    {selectedPage !== 'vote' ? (
                        <Link to={"/vote"} state={{accountNumber: accountNumber}}>
                        <NavButton
                            icon={<HowToVoteIcon />}
                            label="Vote"
                            disabled={complete}
                            isSelected={selectedButton === 'vote'}
                            onClick={() => handleClick('vote')}
                        />
                        </Link>
                        ) : (
                        <div></div>
                    ) }
                    {selectedPage !== 'candidates' ? (
                        <Link to={"/candidates"} state={{accountNumber: accountNumber}}>
                            <NavButton
                                icon={<PeopleIcon />}
                                label="Canidates"
                                disabled={complete}
                                isSelected={selectedButton === 'candidates'}
                                onClick={() => handleClick('candidates')}
                            />
                        </Link>
                        ) :
                        (<div></div>)}

                </div>
                <div className="text-white ml-5 mr-10 text-2xl">
                    <div className="flex flex-row items-center justify-center">
                        <Tooltip title={tooltip}><HelpIcon></HelpIcon></Tooltip><p>Token Balance: <span id="balance">{balance}</span></p>
                    </div>
                </div>
                <div className="relative" ref={setReferenceElement}>
                    <IconButton
                        ref={anchorRef}
                        id="composition-button"
                        aria-label="account"
                        onClick={handleToggle}
                        className="ml-4 w-24 h-24 border-2 border-slate-500 rounded-full bg-neutral-200"
                    >
                        <AccountCircleIcon className="text-white border-2 border-slate-500" sx={{ fontSize: 60 }} />
                    </IconButton>
                    {/*New account popup here*/}
                    <Portal>
                        <div className="absolute z-40 top-14 right-5 bg-gray-300 h-32
                        rounded-xl w-3/12 shadow-lg font-bold text-slate-600 overflow-hidden"
                        ref={setPopperElement}
                        style={styles.popper}
                             {...attributes}
                        hidden={!open}>
                            <div className="flex flex-col space-y-8">
                                <p className="ml-5 mt-3">Connected blockchain account: <span className="italic">{accountNumber}</span></p>
                                <button className="border border-red-700 w-1/3 ml-5
                                rounded-xl text-white text-xl bg-red-700" onClick={() => handleLogout()}>Logout<LogoutIcon className="ml-2"/></button>
                            </div>
                        </div>
                    </Portal>
                </div>
            </div>
        </nav>
    );
}

function NavButton({ icon, label, isSelected, onClick }) {
    return (
        <Button
            variant="contained"
            startIcon={icon}
            onClick={onClick}
            size={"large"}
            sx={{backgroundColor: '#5ebc67'}}
            className={`bg-green-300 hover:bg-slate-400 ${
                isSelected ? 'border-2 border-green-500' : 'border-2 border-transparent'
            }`}
        >
            {label}
        </Button>
    );
}

