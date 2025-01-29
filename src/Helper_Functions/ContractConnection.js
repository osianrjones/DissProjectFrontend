import Web3 from "web3";
import contractABI from "../contracts/Vote.json";

export async function getContractInstance() {
  const networkAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the network ID
      const networkId = await web3.eth.getChainId();

        // Get the contract instance
      return new web3.eth.Contract(
            contractABI.abi,
            networkAddress
        );
    }
    
  } catch (error) {
    console.log(error)
    return null;
  }
}