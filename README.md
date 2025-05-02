a# Creating a system for smart and secure voting using Ethereum smart contracts.

This repository encapsulates the React frontend of my project. Specifically, the components requried to view the website, and the scripts required to interact with the smart contracts.

This project requires MetaMask as a chromium extension, ensure to create a new wallet. To interact with the backend project, add a new network to MetaMask - "http://127.0.0.1:8545". Then, run the Hardhat instance on the backend project (npx hardhat node), deploy the contracts (npx hardhat run scripts/fullDeploy.js --network localhost) and finally import an account given by Hardhat using a private key.

Ensure to select the local network within MetaMask when trying to use the site.

To run the site, use the following commands:

```shell
npm install
npm test
npm start

```
