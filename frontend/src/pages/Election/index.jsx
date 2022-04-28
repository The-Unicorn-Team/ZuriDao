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
      console.log(contenders)
    })

  }

  const start = async () => {
    await startElection()

  }


  useEffect(() => {
    fetch()
  }, [])

  return (
    <main>
     {
        contenders.map((cand, id) => {
          return (

            <div key={id} className="col-4">
              <div className="card">
                <img
                  src="images/profile.jpg"
                  className="card-img-top"
                  alt={cand.name}
                />
                {/* Modal */}
                {show && (
                  <Modal
                    size="lg"
                    show={show}
                    onHide={() => handleClose(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    key={cand.id}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Candidates Manifesto
                      </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <h5 className="card-title">{cand.name}</h5>
                      <p className="card-text">
                        This candidate has a vote count of {cand.votes}
                      </p>
                    </Modal.Body>
                  </Modal>
                )}
                <div className="card-body">
                  <h5 className="card-title"> NAME: {cand.name}</h5>
                  <span className="display-2">VOTECOUNT: {cand.count}</span>
                  {/* <small>ID: {cand.id}</small> */}
                  <br></br>
                  <button
                    className="btn btn-primary btn-lg m-1 px-1"
                    onClick={() => setShow(true)}
                  >
                    View Candidate
                  </button>
                  <button
                    className="btn btn-success btn-lg m-1 px-1 "
                    onClick={fetch}
                  >
                    Vote Candidate
                  </button>
                </div>
              </div>
            </div>
          )
        })
      }
    </main>
  );
};

export default Election;
