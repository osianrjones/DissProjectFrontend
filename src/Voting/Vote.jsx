import NavBar from "../HomePage/NavBar";
import DisplayCandidates from "./DisplayCandidates";
import greenSwirl from "../resources/greenSwirl.jpg";
import logo from "../resources/logo.png";
import Footer from "../HomePage/Footer";
import {useLocation} from "react-router-dom";

const Vote = () => {
    const location = useLocation();
    const accountNumber = location.state.accountNumber;
    console.log(accountNumber);
    return (
    <div className="relative flex min-h-screen" style={{
        backgroundImage: `url(${greenSwirl})`, backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
        width: '100vw',
    }}>
        <NavBar logo={logo} page='vote' />
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24 font-bold text-gray-200 text-5xl">
            <u>Cast your Vote</u>
        </div>
        <DisplayCandidates accountNumber={accountNumber} />
        <Footer/>
    </div>
    )
}

export default Vote;