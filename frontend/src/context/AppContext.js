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
    const [isStudent, setIsStudent] = useState(false)

      
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
        setIsChairman(true);
      }catch(error){
        alert(error);
      }
    }
    
    const checkCreated = async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isCreated();
        setIsCreated(true);
      }catch(error){
        alert(error);
      }
    }

    const checkStarted = async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isStarted();
        setIsStarted(true);
      }catch(error){
        alert(error);
      }
    }

    const checkTeacher= async() => {
      const contract = createEthereumContract();
      try {
        const result = await contract.isTeacher();
        setIsTeacher(true);
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
            isStudent }}>{ children }</AppContext.Provider>
    );
};