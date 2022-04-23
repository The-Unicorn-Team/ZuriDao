import classNames from "classnames";
import { useStyles } from "./styles";
import { ethers } from "ethers"


import { useGlobalStyles } from "../../styles";
import { Link } from "react-router-dom";
import { useCallback, useContext, useState} from "react";
import { Typography } from "@mui/material";
import { AppContext } from '../../context/AppContext';
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { contractAddress } from "../constants/constant";
import abi from "../constants/abi.json";
import { getProviderInfoFromChecksArray } from "web3modal";



const Election = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const { currentAccount, connectWallet , isStudent , getProof } = useContext(AppContext);
  const [candidateId, setCandidateId] = useState(0)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const vote = async() =>{
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(contractAddress, abi.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        const userProof = getProof(currentAccount);
        let voting = await connectedContract.vote(userProof);

          console.log("we are validating your vote....................")

          const receipt = await voting.wait()

          if (receipt.status === 1) {
            alert("Voting successful");}
  
      
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      alert(error)
    }
  }
  

  const handleVote = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure, You want to vote Samuel Okpe',
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
  
  
  

  return (
    <main>
      <section
        className={classNames(
          globalStyles.px,
          classes.hero,
          "bg-no-repeat flex flex-col pb-2"
        )}
      >
        {show ? (
          <Modal
            size="lg"
            show={show}
            onHide={() => handleClose(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Candidates Manifesto
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h5 className="card-title">Samuel Okpe</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}

        {!isStudent ? (
          <div className="container">
            <div className="row">
              <div className="d-flex justify-content-end">
                <button className="btn btn-lg btn-success me-2">
                  Start Election
                </button>
                <button className="btn btn-lg btn-danger me-2">
                  End Election
                </button>
                <button className="btn btn-lg btn-primary me-2">
                  Make Public
                </button>
                <button className="btn btn-lg btn-primary me-2">
                  Make Private
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="card">
                  <img
                    src="images/profile.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Samuel Okpe</h5>
                    <span className="display-2">42</span>
                    <small>votes</small>
                    <br></br>
                    <button
                      className="btn btn-primary btn-lg m-1 px-1"
                      onClick={handleShow}
                    >
                      View Candidate
                    </button>
                    <button
                      className="btn btn-success btn-lg m-1 px-1 "
                      onClick={handleVote}
                    >
                      Vote Candidate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="display-3">
                This page is only accessible to the chairman and teachers
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Election;
