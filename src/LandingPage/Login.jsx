import React, { useState } from 'react';
import Carousel from './Carousel';
import logo from '../resources/loginLogo.png';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Modal from '../Modal';
import metamask from '../resources/metamask.png'
import MetamaskLogo from "../Helper_Components/MetamaskLogo";

const Login = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  async function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a Web3 instance and connect it to MetaMask
        const web3 = new Web3(window.ethereum);

        return web3;  // Return the initialized web3 instance
    } else {
        console.error('MetaMask is not installed!');
    }
}

async function accounts(method) {

  const accounts = await window.ethereum.request(method);
  return accounts;
}


  const handleClick = async () => {
    try {
    const web3 = await initializeWeb3();

    const account = await accounts({method: 'eth_requestAccounts' }).then((account) => {
        const checksumAddress = web3.utils.toChecksumAddress(account[0]);
      navigate('/Home', {
        state: {
          accountNumber: checksumAddress,
        }
      });
    });
    } catch (error) {
      setError(error.message);
      setModalOpen(true);
    }
  }

  const closeModal = () => {
    setModalOpen(false);
    setError(null);
  }

  return (
    <div className="flex h-screen w-7/12 bg-gray-100 border-spacing-36">
      {isModalOpen && <Modal message={error} onClose={closeModal} />}
      <div className='w-72 h-14 ml-8 mt-8'>
      <img src={logo}/>
      </div>
      <div className="items-center justify-center pt-72 pr-56">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome to Election Chain</h1>
        <p className="text-3xl text-gray-600 mb-8 max-w-full">Please continue with MetaMask to log in.</p>
        <button id="button-metamask" onClick={handleClick} className="hover:bg-blue-700 text-4xl text-white font-bold mt-10 py-2 px-4 rounded w-full" style={{backgroundColor: '#5ebc67'}}>
            <div id="container" className="flex flex-row items-center justify-center w-full">
                <MetamaskLogo/>
                <p className="ml-2 text-3xl w-full">Continue with MetaMask</p>
            </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
