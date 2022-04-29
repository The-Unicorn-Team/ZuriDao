import classNames from "classnames";
import { useStyles } from "./styles";
import { ethers } from "ethers"


import { useGlobalStyles } from "../../styles";
import { Link } from "react-router-dom";
import { useCallback, useContext, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { AppContext } from '../../context/AppContext';
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { contractAddress } from "../constants/constant";
import abi from "../constants/abi.json";
import { getProviderInfoFromChecksArray } from "web3modal";

const { ethereum } = window;

const Election = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const { currentAccount, connectWallet, isStudent, getProof, candidateCount, vote, startElection, endElection } = useContext(AppContext);
  const [candidateId, setCandidateId] = useState(0)
  const [show, setShow] = useState(false);
  const [contenders, setContenders] = useState([]);
  const [contract, setContract] = useState("");
  const [candidatesBool, showCandidates] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch contract
  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const ZuriContract = new ethers.Contract(contractAddress, abi.abi, signer);

    return ZuriContract;
  };

  // useEffect(() => {
  //   createEthereumContract();
  // }, [])

  const handleVote = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure, You want to vote for this person',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  //  get all candidates
  const getAllCandidates = async () => {
    const contract = createEthereumContract()
console.log(contract)
    try {
      return await contract.getCandidates()

    }

    catch (error) {
      alert(error)

    }
  }

  const fetch = async () => {
    // handleShow();
    let candidateArray = []

    const result = await getAllCandidates()
    result.map((item) => {
      candidateArray.push({ id: Number(ethers.utils.hexValue(item.id._hex).slice(2)), name: item.name, votes: Number(ethers.utils.hexValue(item.voteCount._hex).slice(2)), })
      setContenders(candidateArray)
      // console.log(contenders)
    })

  }

  const start = async () => {
    await startElection()

  }

  const voteCandidate = async (id) => {
    const contract = createEthereumContract()

    try{
      let root = []
      const merkleRoot = await contract.root()
      root.push(ethers.utils.keccak256(merkleRoot))
      console.log(root)
      console.log(contract.vote(id, root))
      // console.log(await contract.root())
    } catch(error){
      console.log(error)
    }
  }


  useEffect(() => {
    fetch()
  }, [showCandidates])

  return (
    <main>
      <section
        className={classNames(
          globalStyles.px,
          classes.hero,
          "bg-no-repeat flex flex-col pb-2"
        )}
      >
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-end">
              <button className="btn btn-lg btn-success me-2" onClick={start}>
                Start Election
              </button>
              <button className="btn btn-lg btn-danger me-2">
                End Election
              </button>
              <button className="btn btn-lg btn-danger me-2" onClick={() => showCandidates(true)}>
                Get Candidates
              </button>
              <button className="btn btn-lg btn-primary me-2">
                Make Public
              </button>
              <button className="btn btn-lg btn-primary me-2">
                Make Private
              </button>
            </div>
          </div>
        </div>
        {/* {console.log(contenders)} */}
        {/* {console.log(candidatesBool)} */}
        <div className="grid grid-cols-3 gap-4 py-5">
          {candidatesBool && contenders.map((contender, index) => (
            <div key={index} className="max-w-sm basis-1/3 rounded shadow-lg">
              <img className="w-full" src="images/profile.jpg" alt={`${contender.name} with ${contender.count} votes`} />
              <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2">{contender.name}</div>
                <p className="text-gray-700 text-base">{contender.votes} votes</p>
              </div>
              <div className="px-2 flex pt-2 pb-2">
                <span onClick={()=>console.log("view candidate")} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">View Candidate</span>
                <span onClick={()=> voteCandidate(contender.id, contender.name, contender.votes)} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Vote Candidate</span>
              </div>
            </div>

          ))
          }
        </div>
      </section>
    </main>
  );
};

export default Election;
