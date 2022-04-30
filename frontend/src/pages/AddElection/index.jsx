import classNames from "classnames";
import { useStyles } from "./styles";
import { contractAddress, abi } from "../constants/constant";
import { ethers } from 'ethers'

import { useGlobalStyles } from "../../styles";
import { Link } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { AppContext } from '../../context/AppContext';
import PreviewCandidates from "../../components/PreviewCandidates/PreviewCandidates";
const ipfs = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


const AddElection = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const [show, setShow] = useState(false);
  const [candidates, setCandidates] = useState([])
  const [candidate, setCandidate] = useState({ candidate_name: "", picture: "", manifesto: "", pictureFile: "" })
  const { currentAccount, connectWallet, isStudent, setUpElection, addContender } = useContext(AppContext);
  const [preview, setPreview] = useState();
  const [candidateName, setCandidateName] = useState(" ")
  const [candidateNames, setCandidateNames] = useState([])
  const [electionName, setElectionName] = useState(" ")
  const [description, setDescription] = useState(" ")

  const prop = [electionName, description]

  const hash = 'QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH';

  const uploadFile = async (file) => {
   

    try {
        const added = await ipfs.add(file)
        
        return added.path;       
    } catch (err) {
        console.log('Error uploading the file : ', err)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
  };


  const toggleCandidate = () => {
    setShow(true)
  }

  const addCandidate = (event) => {
    event.preventDefault()
    let candids = candidates;
    candids.push(candidate);
    setCandidates(candids)
    // console.log(candidates)

    let candidsName = candidateNames
    candidsName.push(candidateName);
    setCandidateNames(candidsName)


    setShow(false)
    createPreview();
  };

  const handleFileChange = (event) => {
    setCandidate(prev => ({
      ...prev,
      picture: event.target.files[0],
      pictureFile: URL.createObjectURL(event.target.files[0])
    }))
  }

  const handleManiFestoChanges = (event) => {
    const { name, value } = event.target
    setCandidate(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNameChange = (event) => {
    const { name, value } = event.target
    setCandidate(prev => ({
      ...prev,
      [name]: value
    }))

    setCandidateName(value)
  }
  const handleElectionChange = (event) => {
    const { name, value } = event.target
    setElectionName(value)

  }

  const handleDesc = (event) => {
    const { name, value } = event.target
    setDescription(value)

  }

  const handleRemove = (num) => {
    candidates.splice(num, 1);
    createPreview();
  }

  const addCandidateFunction = async (i) => {
    console.log(candidates[i])
    const hashes = await uploadFile(candidates[i].picture);

    await addContender(candidates[i].candidate_name, hashes, candidates[i].manifesto);
  }

  const createPreview = () => {
    const previews = [];
    let candids = candidates
    console.log(candids.length);
    for (let i = 0; i < candids.length; i++) {
      console.log("Hii");
      previews.push(<PreviewCandidates image={candids[i]} handleRemove={handleRemove} addCandidate={addCandidateFunction} keys={i} />)
    }

    setPreview(previews)

  }
  const makeElection = async (e) => {
    try {
      e.preventDefault();

      await setUpElection(prop)

      window.location.href="/election";

    } catch (error) {
      alert(error)
      console.log(error)
    }
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


        {!isStudent ? (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Election Name</label>
                  <input type="text" className="form-control" onChange={handleElectionChange} id="formGroupExampleInput" placeholder="Example input placeholder" />
                </div>
                <div className="mb-3">
                  <label>Brief Description</label>
                  <textarea className="form-control" placeholder="Leave a comment here" onChange={handleDesc} id="floatingTextarea2" />
                </div>

                <hr />
                {!show ? (<button className="btn btn-small btn-success" onClick={toggleCandidate}>Add Candidate</button>) : (
                  <div>
                    <div className="mb-3">
                      <label className="form-label" >Candidate Name</label>
                      <input type="text" className="form-control" onChange={handleNameChange} name="candidate_name" placeholder="Example input placeholder" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Upload Picture</label>
                      <input type="file" className="form-control" onChange={handleFileChange} name="picture" placeholder="Example input placeholder" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Add Manifesto</label>
                      <textarea type="text" className="form-control" name="manifesto" onChange={handleManiFestoChanges} placeholder="Example input placeholder"> </textarea>
                    </div>
                    <button className="btn btn-small btn-primary" onClick={addCandidate} >Add Candidate</button>
                  </div>
                )}

                <button className="btn btn-lg btn-primary float-right" onClick={makeElection}>Setup Election</button>


              </div>
              <div className="col-6">
                <div className="row">
                  {preview}
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

export default AddElection;
