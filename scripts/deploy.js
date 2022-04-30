//implement ethers from hardhat
const{ethers} = require("hardhat");

async function main(){

  const Zuri = await ethers.getContractFactory("ZuriElection")
  console.log("Deploying Zuri...")
  const zuriElection = await upgrades.deployProxy(Zuri,["0x4c29915a50ec868ab99f5844b969c0ad438aec20e61efe2541dbcaf674cc6356"])

  console.log(zuriElection.address," Zuri(proxy) address")
  console.log(await upgrades.erc1967.getImplementationAddress(zuriElection.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(zuriElection.address)," getAdminAddress")   

}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });