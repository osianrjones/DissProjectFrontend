import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";

const Title  = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [account, setAccount] = useState(null);
    const [substring, setSubstring] = useState("");

    useEffect(() => {
        try {
            const accountNumber = location.state.accountNumber;
            setAccount(accountNumber);
            setSubstring(accountNumber.substring(0,5));
        } catch (error) {
            //Case where user is not authenticated with an account number in URL state params
            navigate('/');
        }
    }, [location, navigate]);

    return (
        <div className="flex flex-col w-2/3 ml-auto mr-auto mt-32 pb-5 justify-center items-center text-white">
            <h1 className="font-bold text-5xl">Welcome <Tooltip title={account} arrow>
                <span style={{cursor: 'pointer', textDecoration: 'underline'}}>{substring}...</span></Tooltip></h1>
            <p className="text-3xl">The future of voting is here.</p>
        </div>
    )
}

export default Title;