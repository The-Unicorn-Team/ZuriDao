import { createContext, useState, useEffect} from 'react';


export const AppContext = createContext();
AppContext.displayName = 'AppContext';
const { ethereum } = window;

export const AppContextProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [isStudent, setIsStudent] = useState(false)
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

    const getMerkleProof = (addr) =>{
      return addr;
    }



    useEffect(() => {
      checkIfWalletIsConnect();
    }, []);

    useEffect(() => {
        checkStudent();
    }, [])

    return (
        <AppContext.Provider value={{ currentAccount,
            connectWallet, isStudent, getMerkleProof }}>{ children }</AppContext.Provider>
    );
};