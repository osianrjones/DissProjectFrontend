const { default: web3 } = require("web3");

const migrations = artifacts.require("../build/contracts/DisplayCandidates");

module.exports = function (deployer) {

    let nominees = [
        web3.utils.asciiToHex("Tom"),
        web3.utils.asciiToHex("Chloe"),
        web3.utils.asciiToHex("Pete"),
    ];

    deployer.deploy(migrations, nominees);
};