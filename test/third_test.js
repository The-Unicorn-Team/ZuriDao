const { expect } = require("chai");
const { ethers , upgrades} = require("hardhat");
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

let contract;
let merkleroot;

let stakeholders;

let rootHash;

let getStakeholders = async () => { stakeholders = await ethers.getSigners() };

let merkleTree;

describe("Create Merkle Root", function () {
  it("Should generate the root hash", async function () {
   
    await getStakeholders();
    let stakeholdersarr = [];
    for (let i = 0; i < 5; i++){
      stakeholdersarr.push(stakeholders[i].address);
    }

// this creates a new array "leafnodes" by hashing the index of all stakeholders addresses using keccak256
//then we create a merkletree object 
      const leafnodes = stakeholdersarr.map(addr => keccak256(addr))

      merkleTree = new MerkleTree(leafnodes, keccak256, {sortPairs: true})

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




//describe("Start and End Election", function () {
//   it("Non Chairman Should not be to start Election", async function () {
//     await expect(contract.connect(stakeholders[8]).startElection()).to.be.revertedWith("only chairman can call this function");
//   });

//   it("Chairman Should be to start Election", async function () {
//     const addteacher = await contract.connect(stakeholders[0]).startElection();
//     const txResult = await addteacher.wait();
//     expect(txResult.status).to.equal(1);
//   });

//   it("Non Chairman Should not be to end Election", async function () {
//     await expect(contract.connect(stakeholders[8]).endElection()).to.be.revertedWith("only chairman can call this function");
//   });

//   it("Chairman Should be to end Election", async function () {
//     const addteacher = await contract.connect(stakeholders[0]).endElection();
//     const txResult = await addteacher.wait();
//     expect(txResult.status).to.equal(1);
//   });

// });

describe("Vote Election", function () {

   

    it("Should not be able to vote because he has voted before", async function(){
        console.log(stakeholders.length);
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[1].address));               
        await expect(contract.connect(stakeholders[1]).vote(5, hexProof)).to.be.revertedWith("Please check back, the election has not started!");
    })
    
    it("Should be able to vote election", async function () {
        const owner = stakeholders[0];
        const prop = ["President", "To Elect the next president"]
        await contract.connect(owner).setUpElection(prop);
        await contract.connect(owner).addCandidate("Ernest Opara", "Hash", "Hiii");
        await contract.connect(owner).addCandidate("Adeola Opeyemi", "Hash", "Hiii");
        await contract.connect(stakeholders[0]).startElection();
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[3].address));               
        const vote = await contract.connect(stakeholders[3]).vote(1, hexProof);
        const voted = await vote.wait();
        expect(voted.status).to.be.equal(1);
    });
  
    it("Should be able to return candidates", async function(){
        const candidates = await contract.connect(stakeholders[0]).getCandidates();
        expect(candidates.length).to.be.equal(2);
    })

    it("Should not be able to vote if wrong proof", async function(){
        console.log(stakeholders.length);
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[8].address));               
        await expect(contract.connect(stakeholders[8]).vote(1, hexProof)).to.be.revertedWith("sorry, only stakeholders are eligible to vote");
    })

    it("Should not be able to vote if wrong candidate ID", async function(){
        console.log(stakeholders.length);
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[1].address));               
        await expect(contract.connect(stakeholders[1]).vote(5, hexProof)).to.be.revertedWith("Invalid candidate to Vote!");
    })

    it("Should not be able to vote because he has voted before", async function(){
        console.log(stakeholders.length);
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[3].address));               
        await expect(contract.connect(stakeholders[3]).vote(0, hexProof)).to.be.revertedWith("Voter has already Voted!");
    })

    

    

    it("Can't Make Result public until end of election", async function(){
        console.log(stakeholders.length);
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[0].address));               
        await expect(contract.connect(stakeholders[0]).makeResultPublic()).to.be.revertedWith("Sorry, the Election has not ended");
    })

    it("Should not be able to vote because he has voted before", async function(){
        console.log(stakeholders.length);
        await contract.connect(stakeholders[0]).endElection();
        const hexProof = merkleTree.getHexProof(keccak256(stakeholders[1].address));               
        await expect(contract.connect(stakeholders[1]).vote(5, hexProof)).to.be.revertedWith("Sorry, the Election has ended!");
    })

    it("Non Chairman or Teacher can not make Result public", async function(){
        console.log(stakeholders.length);              
        await expect(contract.connect(stakeholders[3]).makeResultPublic()).to.be.revertedWith("only teachers/chairman can make results public");
    })

    it("Get Winner", async function(){
        console.log(stakeholders.length);              
        await expect(contract.connect(stakeholders[3]).getWinner()).to.be.revertedWith("The Results must be made public");
    })

    it("Can Make Result public ", async function(){
        console.log(stakeholders.length);              
        const makePublic = await contract.connect(stakeholders[0]).makeResultPublic();
        const madePublic = await makePublic.wait();
        expect(madePublic.status).to.be.equal(1);
    })

    it("Get Winner", async function(){
        console.log(stakeholders.length);              
        const makePublic = await contract.connect(stakeholders[0]).getWinner();
        expect(makePublic[0]).to.be.equal(1);
    })


    it("None other than chairman should be able to close election", async function(){
        await expect(contract.connect(stakeholders[3]).closeElection()).to.be.revertedWith("only chairman can call this function");
    })

    it("Chairman Should be able to close election", async function(){
        console.log(stakeholders.length);              
        const makePublic = await contract.connect(stakeholders[0]).closeElection();
        const madePublic = await makePublic.wait();
        expect(madePublic.status).to.be.equal(1);
    })




  });


  describe("Helper Functions", function () {

    it("Should be able know if election has started", async function(){
        const isStart = await contract.connect(stakeholders[0]).isStarted();
        expect(isStart).to.be.equal(false);
    })

    it("Should be able to know if election has ended", async function(){
        const isEnd = await contract.connect(stakeholders[0]).isEnded();
        expect(isEnd).to.be.equal(false);
    })

    it("Should be able to know if chairman", async function(){
        const isChairman = await contract.connect(stakeholders[0]).isChairman();
        expect(isChairman).to.be.equal(true);
    })

    it("Should be able to know if election has ended", async function(){
        await contract.connect(stakeholders[0]).addTeacher(stakeholders[1].address);
        const isTeacher = await contract.connect(stakeholders[1]).isTeacher();
        expect(isTeacher).to.be.equal(true);
    })
    
    it("Should be able to know if chairman", async function(){
        const isCreated = await contract.connect(stakeholders[0]).isCreated();
        expect(isCreated).to.be.equal(false);
    })



  });























