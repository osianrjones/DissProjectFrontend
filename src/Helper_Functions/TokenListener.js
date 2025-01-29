import {getContractInstance} from "./ContractConnection";
import {addToken} from "./TokenBalance";

export async function setupTokenListener() {
    const contract = await getContractInstance();

    const subscription = contract.events.TokenSent();

    subscription.once('data', async (event) => {
        console.log("tokensubscription!")
        await addToken(null);
    });

    return subscription;
}