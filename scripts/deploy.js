//implement ethers from hardhat

const { ethers, upgrades } = require("hardhat");

async function main(){

    const ZuriElection = await ethers.getContractFactory("ZuriElection");

    console.log("deploying ZuriElection contract>>>>>>>>>>>>>")
  const proxy = await upgrades.deployProxy(ZuriElection, ["0x4c29915a50ec868ab99f5844b969c0ad438aec20e61efe2541dbcaf674cc6356"]);
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