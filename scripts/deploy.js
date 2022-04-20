//implement ethers from hardhat
const{ethers} = require("hardhat");

async function main(){
     /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so NestcoinContract here is a factory for instances of our Nestcoin contract.
  */
 console.log("deploying ZuriElection contract.......")
    const ZuriElection = await ethers.getContractFactory("ZuriElection");

    // here we deploy the contract
    const zuri = await ZuriElection.deploy();

    // Wait for it to finish deploying
  await zuri.deployed();

  // print the address of the deployed contract
  console.log(
    "\n 🏵 ZuriElection Contract Address:",
    zuri.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });