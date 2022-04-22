const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

describe("Create Merkle Root", function () {
  it("Should return the new greeting once it's changed", async function () {
    const ZuriElection = await ethers.getContractFactory("ZuriElection");

    console.log("deploying ZuriElection contract>>>>>>>>>>>>>")
      const proxy = await upgrades.deployProxy(ZuriElection, []);
      await proxy.deployed();

      console.log("ZuriElection Contract Address is...\n", proxy.address);
  });
});


describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const ZuriElection = await ethers.getContractFactory("ZuriElection");

    console.log("deploying ZuriElection contract>>>>>>>>>>>>>")
      const proxy = await upgrades.deployProxy(ZuriElection, []);
      await proxy.deployed();

      console.log("ZuriElection Contract Address is...\n", proxy.address);
  });
});
