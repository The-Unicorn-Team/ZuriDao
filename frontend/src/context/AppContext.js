import { createContext, useState, useEffect} from 'react';
import { contractAddress } from "../pages/constants/constant";
import abi from "../pages/constants/abi.json";
import { ethers } from 'ethers';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';
const { ethereum } = window;

export const AppContextProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [isChairman, setIsChairman] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [elections, setElections] = useState([]);
 
    const stakeholders = [
      "0x9F6Dd51f7a18Ce5D6FaFF9e5d3e5764Cca61cC44","0x20497F37a8169c8C9fA09411F8c2CFB7c90dE5d1","0x70FADB1887f906dF7060330b61ed16434d82189f","0x3849DDF392848582b860982740615b43AA537aC2","0x5d16FA7F1f7513e4603103dc353A284aA96BA7f4","0x7F913b411F2C509dc1C8271aFb26160223fa6be8"
  ]
      
    const createEthereumContract = () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const ZuriContract = new ethers.Contract(contractAddress, abi.abi, signer);
     
      return ZuriContract;
    };



    const checkChairman = async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isChairman();
        setIsChairman(result);
      }catch(error){
        alert(error);
      }
    }
    
    const checkCreated = async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isCreated();
        setIsCreated(result);
      }catch(error){
        alert(error);
      }
    }

    const checkStarted = async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isStarted();
        setIsStarted(result);
      }catch(error){
        alert(error);
      }
    }

    const checkTeacher= async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isTeacher();
        setIsTeacher(result);
      }catch(error){
        alert(error);
      }
    }

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

    const getCandidates = async() =>{
      const contract = createEthereumContract();

      try {
        let result = await contract.getCandidates();

        return result
                  }
      catch(error){
        alert(error)
      
      }
    }

    // Get Winner Function
    const getWinner = async() =>{
      const contract = createEthereumContract();

      try {
        let result = await contract.getWinner();

        return result
                  }
      catch(error){
        alert(error)
      
      }
    }

    const setUpElection = async(prop) =>{
      const contract = createEthereumContract();

      try {
        let result = await contract.setUpElection(prop);
        const receipt = await result.wait();
        if (receipt.status === 1) {
         console.log("success");}
          }
      catch(error){
        console.log(error)
      
      }
    }

    const addContender = async(name, hash, manifesto) =>{
      const contract = createEthereumContract();

      try {
        let result = await contract.addCandidate(name, hash, manifesto);
        const receipt = await result.wait();
        if (receipt.status === 1) {
         console.log("success");}
          }
      catch(error){
        console.log(error)
      
      }
    }

    const makeResultsPublic = async() =>{
      const contract = createEthereumContract();

      try {
        let result = await contract.makeResultPublic();
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

    const getElections = async () => {
      const contract = createEthereumContract();
      try {
        const  result = await contract.getWinners();
        setElections(result); 
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
      //  const provider = new ethers.providers.Web3Provider(ethereum);
        // const accounts = await ethereum.request({ method: "eth_accounts" });
  
        // if (accounts.length) {
        // //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
        // setCurrentAccount(accounts[0]);
        // console.log(accounts);
        console.log(currentAccount);
        ethereum.on('accountsChanged',  () => {
           
            
          window.location.href="/";
        });

        if(sessionStorage.getItem("wallet")){
          setCurrentAccount(sessionStorage.getItem("wallet"));
        }

        // ethereum.on('disconnect', ()=>{
        //   setCurrentAccount("");
        //   window.location.href="/";
        // });
        // } else {
        //   console.log("No accounts found");
        // }
      } catch (error) {
        console.log(error);
      }
    };

  
    
  
    const connectWallet = async () => {
     
      try {
       
        if (!ethereum) return alert("Please install MetaMask.");
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        
  
        setCurrentAccount(accounts[0]);
        sessionStorage.setItem("wallet", accounts[0]);
        // window.location.reload();
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

   

    const disconnectWallet = async () => {
      setCurrentAccount("");
      sessionStorage.clear();
      window.location.reload();
    }

    

    useEffect(() => {
      checkIfWalletIsConnect();
    }, []);

    useEffect(() => {
        checkChairman();
        checkCreated();
        checkStarted();
        checkTeacher();
    }, []);

    return (
        <AppContext.Provider value={{ currentAccount,
            connectWallet,
            disconnectWallet, 
            getCandidates, 
            setUpElection, 
            addContender, 
            elections,
            isChairman,
            isCreated,
            isStarted,
            isTeacher,
            makeResultsPublic, 
            
            vote, 
            startElection,
            endElection,
            removeTeacher,
            addTeacher,
            changeChairman,
            pauseContract, 
            unPauseContract, 
            isStudent, getWinner }}>{ children }</AppContext.Provider>
    );
};