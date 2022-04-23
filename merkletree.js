const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

console.log("the merkleTree is loading.................................")

let stakeholders = [
    "0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44","0x20497F37a8169c8C9fA09411F8c2CFB7c90dE5d1","0x70FADB1887f906dF7060330b61ed16434d82189f","0x3849DDF392848582b860982740615b43AA537aC2","0x5d16FA7F1f7513e4603103dc353A284aA96BA7f4"
]

// this creates a new array "leafnodes" by hashing the index of all stakeholders addresses using keccak256
//then we create a merkletree object 
const leafnodes = stakeholders.map(addr => keccak256(addr))

const merkleTree = new MerkleTree(leafnodes, keccak256, {sortPairs: true})

const rootHash = merkleTree.getRoot()

console.log("stakeholder's merkle tree\n", merkleTree.toString())

const test = keccak256("0x5d16FA7F1f7513e4603103dc353A284aA96BA7f4")

const hexProof = merkleTree.getHexProof(test);

const buf2hex = x => '0x' + x.toString('hex')

console.log("this is the root\n", buf2hex(rootHash))
console.log("this is the proof\n", hexProof)

console.log("testing a scenario")
console.log(merkleTree.verify(hexProof,test,rootHash))