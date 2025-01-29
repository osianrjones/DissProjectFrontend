import Web3 from "web3";
import JSONabi from "../contracts/VoteToken.json";

export async function addToken(address) {
    const tokenSymbol = "VTK";
    const tokenDecimals = 18;

    try {
        if (window.ethereum) {
            const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

            const web3 = new Web3(window.ethereum);

            if (address == null) {
                console.log("Starting request accounts...");
                address = await window.ethereum.request({ method: "eth_requestAccounts" });
                address = address[0];
                console.log("Using address: ", address);
            }

            const tokenContract = new web3.eth.Contract(JSONabi.abi, contractAddress);

            console.log(address);

            const weiBalance = await tokenContract.methods.balanceOf(address).call();

            const readableBalance = web3.utils.fromWei(weiBalance, "ether");

            console.log(`Balance of account number ${address}: `, readableBalance);

            console.log("Starting wallet_watchAsset");

            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: contractAddress,
                        tokenSymbol: tokenSymbol,
                        decimals: tokenDecimals,
                    },
                },
            });

            console.log("Token added to MetaMask.");
            document.getElementById("balance").innerHTML = "1";
        }

    } catch (error) {
        console.log(error)
        return null;
    }

}