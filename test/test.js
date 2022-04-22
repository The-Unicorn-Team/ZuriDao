const { expect } = require("chai");
const { ethers , upgrades} = require("hardhat");
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

let contract;
let merkleroot;

let stakeholders;

let rootHash;

let getStakeholders = async () => { stakeholders = await ethers.getSigners() };

describe("Create Merkle Root", function () {
  it("Should generate the root hash", async function () {
   
    await getStakeholders();
    let stakeholdersarr = [];
    for (let i = 0; i < stakeholders.length; i++){
      stakeholdersarr.push(stakeholders[i].address);
    }

// this creates a new array "leafnodes" by hashing the index of all stakeholders addresses using keccak256
//then we create a merkletree object 
      const leafnodes = stakeholdersarr.map(addr => keccak256(addr))

      const merkleTree = new MerkleTree(leafnodes, keccak256, {sortPairs: true})

      rootHash = merkleTree.getRoot()

      console.log("stakeholder's merkle tree\n", merkleTree.toString())
      
      const buf2hex = x => '0x' + x.toString('hex');

      merkleroot = buf2hex(rootHash);

      console.log("the root hash is\n", merkleroot)
  });
});


describe("ZuriElection", function () {
  it("Should Deploy the contract Successfully", async function () {
    const ZuriElection = await ethers.getContractFactory("ZuriElection");

    console.log("deploying ZuriElection contract>>>>>>>>>>>>>")
      const proxy = await upgrades.deployProxy(ZuriElection, [merkleroot]);
      console.log(merkleroot);
      await proxy.deployed();

      console.log("ZuriElection Contract Address is...\n", proxy.address);
  });
});


