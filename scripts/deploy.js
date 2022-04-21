//implement ethers from hardhat

const { ethers, upgrades } = require("hardhat");

async function main(){

    const ZuriElection = await ethers.getContractFactory("ZuriElection");

    console.log("deploying ZuriElection contract>>>>>>>>>>>>>")
  const proxy = await upgrades.deployProxy(ZuriElection, []);
  await proxy.deployed();

  console.log("ZuriElection Contract Address is...\n", proxy.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });