
import Admin from './Admin';
import classNames from 'classnames';
import { useStyles } from './styles';
import { ethers } from 'ethers';

import { useGlobalStyles } from '../../styles';
import { Link } from 'react-router-dom';
import { useCallback, useContext, useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { AppContext } from '../../context/AppContext';
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { contractAddress } from '../constants/constant';
import abi from '../constants/abi.json';
import { getProviderInfoFromChecksArray } from 'web3modal';


const { ethereum } = window;

const Election = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const {
    currentAccount,
    connectWallet,
    isStudent,
    getProof,
    candidateCount,
    vote,
    startElection,
    endElection,
  } = useContext(AppContext);
  const [candidateId, setCandidateId] = useState(0);
  const [show, setShow] = useState(false);
  const [contenders, setContenders] = useState([]);
  const [contract, setContract] = useState('');
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
          onClick: () => alert('Click Yes'),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };

  //  get all candidates
  const getAllCandidates = async () => {
    const contract = createEthereumContract();
    console.log(contract);
    try {
      return await contract.getCandidates();
    } catch (error) {
      alert(error);
    }
  };

  const fetch = async () => {
    // handleShow();
    let candidateArray = [];

    const result = await getAllCandidates();
    result.map((item) => {
      candidateArray.push({
        id: Number(ethers.utils.hexValue(item.id._hex).slice(2)),
        name: item.name,
        votes: Number(ethers.utils.hexValue(item.voteCount._hex).slice(2)),
      });
      setContenders(candidateArray);
      // console.log(contenders)
    });
  };

  const start = async () => {
    await startElection();
  };

  const voteCandidate = async (id) => {
    const contract = createEthereumContract();

    try {
      let root = [];
      const merkleRoot = await contract.root();
      root.push(ethers.utils.keccak256(merkleRoot));
      console.log(root);
      console.log(contract.vote(id, root));
      // console.log(await contract.root())
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, [showCandidates]);
};

 


export default index;
