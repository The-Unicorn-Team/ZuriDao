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
      const proxy = await ZuriElection.deploy(merkleroot);
      console.log(merkleroot);
      contract = await proxy.deployed();

      console.log("ZuriElection Contract Address is...\n", proxy.address);
  });
});


describe("Adding Teachers", function () {
  it("Chairman Should be able to add teachers", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(owner).addTeacher(stakeholders[1].address);
    await contract.connect(owner).addTeacher(stakeholders[5].address);
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Teacher Should be able to add teachers", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(stakeholders[1]).addTeacher(stakeholders[2].address);
    await contract.connect(owner).addTeacher(stakeholders[6].address);
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Non Teachers and Chairman Should not be able to add teachers", async function () {
    const owner = stakeholders[0];
    await expect(contract.connect(stakeholders[3]).addTeacher(stakeholders[4].address)).to.be.revertedWith("only teachers/chairman can call this function");
  });

});

describe("Remove Teachers", function () {
  it("Chairman Should be to remove teachers", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(owner).removeTeacher(stakeholders[5].address);
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Teacher Should be able to remove teachers", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(stakeholders[1]).removeTeacher(stakeholders[6].address);
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Non Teachers and Chairman Should not be able to add teachers", async function () {
    const owner = stakeholders[0];
    await expect(contract.connect(stakeholders[3]).removeTeacher(stakeholders[4].address)).to.be.revertedWith("only teachers/chairman can call this function");
  });

});

describe("Pause Contract", function () {
  it("Chairman Should be to pause contract", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(owner).pause();
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Non Chairman Should not be able to pause contract", async function () {
    const owner = stakeholders[0];
    await expect(contract.connect(stakeholders[3]).pause(stakeholders[4].address)).to.be.reverted;
  });
});


describe("Unpause Contract", function () {
  it("Chairman Should be to pause contract", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(owner).unpause();
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Non Chairman Should not be able to pause contract", async function () {
    const owner = stakeholders[0];
    await expect(contract.connect(stakeholders[3]).unpause(stakeholders[4].address)).to.be.reverted;
  });
});

describe("ChangeChairman", function () {
  it("Chairman Should be to change chairman", async function () {
    const owner = stakeholders[0];
    const addteacher = await contract.connect(owner).changeChairman(stakeholders[8].address);
    const txResult = await addteacher.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Non Chairman Should not be able to change chairman", async function () {
    const owner = stakeholders[0];
    await expect(contract.connect(stakeholders[3]).changeChairman(stakeholders[9].address)).to.be.revertedWith("only chairman can call this function");
  });
});


describe("SetUp Election", function () {

  it("Can't  setUp Election if candidate length is zero ", async function(){
    await contract.connect(stakeholders[8]).changeChairman(stakeholders[0].address)
    const prop = []
    await expect(contract.connect(stakeholders[0]).setUpElection(prop)).to.be.revertedWith("atleast one person should contest");
  });

  it("Chairman Should be to setUp Election", async function () {
    const owner = stakeholders[0];
    const prop = ["President", "To Elect the next president"]
    const candidates = ["Adeola Ajayi","Ernest Opara"];
    const setUp = await contract.connect(owner).setUpElection(prop);
    const addC = await contract.connect(owner).addCandidate("Ernest Opara", "Hash", "Hiii");
    const txResultC = await addC.wait();
    expect(txResultC.status).to.equal(1);
    const txResult = await setUp.wait();
    expect(txResult.status).to.equal(1);
  });

  it("Teacher Should be able to setUp Election", async function () {
    const prop = ["President", "To Elect the next president"]
    const setUp = await contract.connect(stakeholders[1]).setUpElection(prop);
    const addC = await contract.connect(stakeholders[1]).addCandidate("Adeola Ajayi", "Hash", "Hiii");
    const txResult = await setUp.wait();
    const txResultC = await addC.wait();
    expect(txResultC.status).to.equal(1);
    expect(txResult.status).to.equal(1);
  });

  


  it("Non Chairman and Non Teacher Should not be able to setUp Election", async function () {
    const prop = ["President", "To Elect the next president"]
    const candidates = ["Adeola Ajayi","Ernest Opara"];
    await expect(contract.connect(stakeholders[8]).setUpElection(prop)).to.be.revertedWith("only teachers/chairman can call this function");
    await expect(contract.connect(stakeholders[8]).addCandidate("Adeola Ajayi", "Hash", "Hiii")).to.be.revertedWith("only teachers/chairman can call this function");
  });

  it("Can't  setUp Election if Election has started", async function(){
      await contract.connect(stakeholders[0]).startElection();
      const prop = ["President", "To Elect the next president"]
      await expect(contract.connect(stakeholders[0]).setUpElection(prop)).to.be.revertedWith("Election is Ongoing");
      await expect(contract.connect(stakeholders[8]).addCandidate("Adeola Ajayi", "Hash", "Hiii")).to.be.revertedWith("Election is Ongoing");
  });


});



















