import Web3 from "web3";
import ABI from "../contracts/VoteToken.json";

export async function tokenAllowance(spenderAddress) {
    try {
        const tokenAbi = ABI.abi;
        const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        if (window.ethereum) {
            //Setup connection
            const web3 = new Web3(window.ethereum);

            const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
            const weiBalance = await tokenContract.methods.balanceOf(spenderAddress).call();

            const readableBalance = web3.utils.fromWei(weiBalance, "ether");

            return readableBalance === "1";
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}