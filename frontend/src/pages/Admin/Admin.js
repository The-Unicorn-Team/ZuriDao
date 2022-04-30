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


const style = {
  Electbtn: `px-3 py-2  rounded hover:ml-6`,
};
const Admin = () => {
  
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const {
    addTeacher,
    changeChairman,
    removeTeacher,
    pauseContract,
    unPauseContract,
  } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [chairman, setChairman] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
  };

  // context
  const {
    isStudent,
    getProof,
    candidateCount,
    vote,
    makeResultsPublic,
    startElection,
    endElection,
  } = useContext(AppContext);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addTeacher(address);
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    await removeTeacher(address);
  };
  const handleChair = async (e) => {
    e.preventDefault();
    await changeChairman(address);
  };
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
}

  // start Election function
  const startElectionFunc = async () => {
    await startElection();
  };

  // end Election function
  const endElectionFunc = async () => {
    await endElection();
  };

  // end Election function
  const makeResultsPublicFunc = async () => {
    console.log(await makeResultsPublic());
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center align-items-center w-full ">
        <div className="flex flex-col sm:flex-row justify-center align-items-center w-full  mt-10">
          <Button
            title="Create Election"
            link="/add-election"
            style={`bg-green-500 ${style.Electbtn} bg-opacity-25`}
          />
          <button
            className={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
            onClick={startElectionFunc}>
            Start Election
          </button>
          <button
            className={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
            onClick={endElectionFunc}>
            End Election
          </button>
          <button
            className={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
            onClick={makeResultsPublicFunc}>
            Make Public
          </button>
          <button
            className={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
            // onClick={makeResultsPrivateFunc}
          >
            Make Private
          </button>
          <button
            className={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
            // onClick={() => showCandidates(true)}
          >
            Get Candidate
          </button>
        </div>
      </div>

      <div className="w-1/2 justify-center align-items-center">
        <section
          className={classNames(
            globalStyles.px,
            classes.hero,
            'bg-no-repeat flex flex-col pb-2',
          )}>
          <div className="col-md-9">
            <div className="row">
              <form className="row g-3">
                <div className="col-12">
                  <label  className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary mr-7"
                    onClick={handleAdd}>
                    Add Teacher
                  </button>
                  {'     '} {'     '}{' '}
                  <button
                    type="submit"
                    className=" pl-9 btn btn-warning"
                    onClick={handleRemove}>
                    Remove Teacher
                  </button>
                </div>
              </form>
            </div>
            <br />
            <br />
            <div>
              <label  className="form-label">
                CHAIRMAN
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Enter Address"
                onChange={(e) => setChairman(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary mr-7 mt-2"
                onClick={handleChair}>
                changeChairman
              </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <button
              className="btn btn-lg btn-success"
              onClick={unPauseContract}>
              Restart Contract
            </button>
            <br />
            <br />
            <button className="btn btn-lg btn-danger" onClick={pauseContract}>
              Pause Contract
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;

const Button = (prop) => {
  return (
    <div className={`px-4 py-2  ${prop.style}`}>
      <Link
        to={prop.link}
        className={`text-decoration-none text-gray-700 hover:text-gray-800 hover:font-semibold translate-x-2 duration-500`}>
        {prop.title}
      </Link>
    </div>
  );
};
