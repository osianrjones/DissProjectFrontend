import Web3 from "web3";
import ABI from "../contracts/VoteToken.json";

export async function approve(tokenAddress, spenderAddress, userAddress) {

    if (window.ethereum) {
        //Setup connection
        const web3 = new Web3(window.ethereum);

        const tokenAbi = ABI.abi;

        const TOKEN_ADDRESS = tokenAddress;
        const SPENDER_ADDRESS = spenderAddress;
        const USER_ADDRESS = userAddress;

        const tokenContract = new web3.eth.Contract(tokenAbi, TOKEN_ADDRESS);
        //Approve token

        const amountToApprove = web3.utils.toWei('1', "ether");

        try {
            const receipt = await tokenContract.methods.approve(SPENDER_ADDRESS, amountToApprove).send(
                { from: USER_ADDRESS
                });
            console.log("Approval successful: ", receipt);
            return true;
        } catch (error) {
            console.log("Approval failed: ", error);
            return false;
        }
    } else {
        return false;
    }


}

export default approve;