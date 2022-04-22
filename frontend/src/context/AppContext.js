import { createContext, useState, useEffect} from 'react';
import {MerkleTree} from "merkletreejs"
import {keccak256} from "keccak256"
import { contractAddress, abi } from "../pages/constants/constant";
import { ethers } from 'ethers';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';
const { ethereum } = window;

export const AppContextProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [isStudent, setIsStudent] = useState(false)

      
    const createEthereumContract = () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const ZuriContract = new ethers.Contract(contractAddress, abi.abi, signer);
     
      return ZuriContract;
    };

    const vote = async(id, proof) =>{
      const contract = createEthereumContract();

      try {
       let result = await contract.vote(id,proof);
       
       const receipt = await result.wait();
       if (receipt.status === 1) {
        alert("success");}
          }
      catch(error){
        alert(error)
      
      }
    }

    const setUpElection = async(prop, candidadateNames) =>{
      const contract = createEthereumContract();

      try {
        let result = await contract._setUpElection(prop, candidadateNames);
        const receipt = await result.wait();
        if (receipt.status === 1) {
         alert("success");}
          }
      catch(error){
        alert(error)
      
      }
    }

    const startElection = async() =>{
      const contract = createEthereumContract();

      try {
        let result = await contract.startElection();
        const receipt = await result.wait();
        if (receipt.status === 1) {
         alert("success");}
          }
      catch(error){
        alert(error)
      
      }
    }

    const endElection = async() =>{
      const contract = createEthereumContract();

      try {
      let result =  await contract.endElection();
      const receipt = await result.wait();
      if (receipt.status === 1) {
       alert("success");}
               }
      catch(error){
        alert(error)
      
      }
    }


    const changeChairman = async(addr) => {
      const contract = createEthereumContract();
      
     try {
       const  result =await contract.changeChairman(addr);
      
      return result
      }
     catch(error){
       console.log(error)
     
     }
    }

    const addTeacher = async(addr) => {
      const contract = createEthereumContract();
      
     try {
       const  result =await contract.addTeacher(addr);
      
      return result
      }
     catch(error){
       console.log(error)
     
     }
    }
    
    
    const removeTeacher = async(addr) => {
      const contract = createEthereumContract();
      
     try {
       const  result =await contract.removeTeacher(addr);
      
      return result
      }
     catch(error){
       console.log(error)
      
     }
    }
    const pauseContract = async() => {
      const contract = createEthereumContract();
      
     try {
       const  result =await contract.pause();
      
      return result
      }
     catch(error){
       console.log(error)
      
     }
    }
    
    const unPauseContract = async() => {
      const contract = createEthereumContract();
      
     try {
       const  result =await contract.unpause();
      
      return result
      }
     catch(error){
       console.log(error)
      
     }
    }

    const checkIfWalletIsConnect = async () => {
      
      try {
        if (!ethereum) return alert("Please install MetaMask.");
       // const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length) {
        //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
        setCurrentAccount(accounts[0]);
        console.log(accounts);
      
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const checkStudent = async () => {
        setIsStudent(false);
    }
  
    
  
    const connectWallet = async () => {
     
      try {
       
        if (!ethereum) return alert("Please install MetaMask.");
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        
  
        setCurrentAccount(accounts[0]);
        
        
        window.location.reload();
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

    const getProof = (address) => {

      let stakeholders = [
        "0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44","0x20497F37a8169c8C9fA09411F8c2CFB7c90dE5d1","0x70FADB1887f906dF7060330b61ed16434d82189f","0x3849DDF392848582b860982740615b43AA537aC2","0x5d16FA7F1f7513e4603103dc353A284aA96BA7f4"
    ]
    
    // this creates a new array "leafnodes" by hashing the index of all stakeholders addresses using keccak256
    //then we create a merkletree object 
    const leafnodes = stakeholders.map(addr => keccak256(addr))
    
    const merkleTree = new MerkleTree(leafnodes, keccak256, {sortPairs: true})
    
    const hexProof = merkleTree.getHexProof(address);
      return hexProof
    }

    useEffect(() => {
      checkIfWalletIsConnect();
    }, []);

    useEffect(() => {
        checkStudent();
    }, [])

    return (
        <AppContext.Provider value={{ currentAccount,
            connectWallet, setUpElection,   getProof,vote, startElection,endElection,removeTeacher,addTeacher,changeChairman,pauseContract, unPauseContract, isStudent }}>{ children }</AppContext.Provider>
    );
};