import {getContractInstance} from "./ContractConnection";

export async function setupRegistrationListener() {

    const contract = await getContractInstance();

    const subscription = contract.events.Registered();

    subscription.once('data', (event) => {
        console.log('Registered received: ', event);
    });

    return subscription;
}