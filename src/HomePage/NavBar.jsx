import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, IconButton, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener, Tooltip} from '@mui/material';
import { Home as HomeIcon, People as PeopleIcon, Info as InfoIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import {Outlet, Link, useLocation, useNavigate} from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import HelpIcon from '@mui/icons-material/Help';
import {getContractInstance} from "../Helper_Functions/ContractConnection";
import NotificationBell from "../Helper_Components/NotificationBell";
import {setupRegistrationListener} from "../Helper_Functions/RegistrationListener";
import {setupTokenListener} from "../Helper_Functions/TokenListener";
import {tokenBalance} from "../Helper_Functions/TokenBalance";
import approve from "../Helper_Functions/ApproveToken";
import {tokenAllowance} from "../Helper_Functions/TokenAllowance";

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

    useEffect(() => {
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
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-label="account"
                    onClick={handleToggle}
                    className="ml-4 w-24 h-24 border-2 border-slate-500 rounded-full bg-neutral-200"
                >
                    <AccountCircleIcon className="text-white border-2 border-slate-500" sx={{ fontSize: 60 }} />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-end"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
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

