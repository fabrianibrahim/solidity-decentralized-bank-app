# Decentralized Bank Application Using Solidity Smart Contracts

### Compile the smart contract using a Solidity compiler

brownie compile

### Start the Ganache server to run a local blockchain.

ganache-cli

### Deploy the smart contract from the /usercode/bank_app folder.

brownie run deploy --network development

### Start the Flask server in the /scripts/app/api folder to handle the backend of the application.

cd scripts/app/api
flask run

### Start up the front end of the application.

cd /usercode/bank_app/scripts/app
npm start
