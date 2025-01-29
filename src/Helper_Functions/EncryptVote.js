import {JSEncrypt} from "jsencrypt";

export function encryptVote(index) {

    const proposals = ["Ronald", "Barack", "Bill", "George"];

    const vote = proposals[index];

    try {
        const publicKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxSz/nL4jN5gT5jkEYzhL
LzvMjzQpSwe6ZeiopQ/se6GupzQ9sBnbqjbYYoFswkaa0GQVr+25roqc9gaI/7It
cCMOVa7QcD5sPWrOUBXWlMAgOoocZS+KubU3dJe3DweQ5SMGRLHs9Fzxa2giRGtt
GZsNu0IbMNHMa8BRaEyQ9xguK55+8G9uQeibLB2J9jtpROpfBjhABbc70VKqeYfp
dPBYpyMDvUFVi61rltlG50GNU408RgwWO0ClK4qy3iMums4axveuC28npcvAc1ry
hod2dKR9eJSCgLaZFa/IuJRjEXch1RDyq2CG/ShhNck0W+pCO+UUtSn8hvDayvkM
swIDAQAB
        -----END PUBLIC KEY-----`;

        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        return encrypt.encrypt(vote);
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default encryptVote;