//implement ethers from hardhat
const{ethers} = require("hardhat");

async function main(){
     /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so NestcoinContract here is a factory for instances of our Nestcoin contract.
  */
 console.log("deploying ZURIELECTION contract.......")
    const ZuriContract = await ethers.getContractFactory("ZuriElection");

    // here we deploy the contract
    const Zuri = await ZuriContract.deploy();

    // Wait for it to finish deploying
  await Zuri.deployed();

  // print the address of the deployed contract
  console.log(
    "\n 🏵 ZuriElection Contract Address:",
    Zuri.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });