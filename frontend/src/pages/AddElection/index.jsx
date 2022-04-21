import classNames from "classnames";
import { useStyles } from "./styles";

import { useGlobalStyles } from "../../styles";
import { Link } from "react-router-dom";
import { useCallback, useContext, useState} from "react";
import { Typography } from "@mui/material";
import { ReactComponent as GoogleLogo } from "../../assets/images/shared/google.svg";
import { ReactComponent as MicrosoftLogo } from "../../assets/images/shared/microsoft.svg";
import { ReactComponent as TeslaLogo } from "../../assets/images/shared/tesla.svg";
import { ReactComponent as NvidiaLogo } from "../../assets/images/shared/nvidia.svg";
import { ReactComponent as OracleLogo } from "../../assets/images/shared/oracle.svg";
import { ReactComponent as HewlettPackardLogo } from "../../assets/images/shared/hewlett-packard.svg";
import { AppContext } from '../../context/AppContext';
import PreviewCandidates from "../../components/PreviewCandidates/PreviewCandidates";


const AddElection = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const [show, setShow] = useState(false);
  const [candidates , setCandidates] = useState([])
  const [candidate, setCandidate] = useState({candidate_name : "", picture : "", manifesto : "", pictureFile : ""})
  const { currentAccount, connectWallet , isStudent } = useContext(AppContext);
  const [preview, setPreview] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
  };


  const toggleCandidate = ()=>{
        setShow(true)
  }

  const addCandidate = (event) => {
      event.preventDefault()
      let candids = candidates;
      candids.push(candidate);
      setCandidates(candids)
      console.log(candidates, "hello");
      console.log(candids);
      setShow(false)
      createPreview();
  };

  const handleFileChange = (event) => {
    setCandidate(prev => ({
        ...prev,
        picture : event.target.files[0],
        pictureFile : URL.createObjectURL(event.target.files[0])
    }))
  }

  const handleManiFestoChanges = (event) => {
    const {name, value} = event.target
    setCandidate(prev => ({
        ...prev,
        [name]: value
    }))
  }

  const handleNameChange = (event) => {
    const {name, value} = event.target
    setCandidate(prev => ({
        ...prev,
        [name]: value
    }))
  }

  const handleRemove= (num) => {
    candidates.splice(num, 1);
    createPreview();
  }


  const createPreview = () =>{
    const previews = [];
    let candids =  candidates
    console.log(candids.length);
    for (let i = 0; i < candids.length; i++){
        console.log("Hii");
        previews.push(<PreviewCandidates image={candids[i]} handleRemove={handleRemove} keys={i}/>)
    }

    setPreview(previews)

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
                            <label  className="form-label">Election Name</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                        </div>
                        <div className="mb-3">
                            <label>Brief Description</label>
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"/>
                        </div>
                        <hr/>
                        {!show ? ( <button className="btn btn-small btn-success" onClick={toggleCandidate}>Add Candidate</button>) : (
                            <div>
                                <div className="mb-3">
                                    <label  className="form-label" >Candidate Name</label>
                                    <input type="text" className="form-control"  onChange={handleNameChange} name="candidate_name" placeholder="Example input placeholder"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Upload Picture</label>
                                    <input type="file" className="form-control" onChange={handleFileChange} name="picture" placeholder="Example input placeholder"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Add Manifesto</label>
                                    <textarea type="text" className="form-control" name="manifesto" onChange={handleManiFestoChanges} placeholder="Example input placeholder"> </textarea>
                                </div>
                                <button className="btn btn-small btn-primary" onClick={addCandidate} >Add Candidate</button>
                            </div>
                        )}

                        <button  className="btn btn-lg btn-primary float-right">Add Election</button>
                       
                        
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
