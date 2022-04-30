import classNames from "classnames";
import { useStyles } from "./styles";

import { useGlobalStyles } from "../../styles";
import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect , useState } from "react";
import { Typography } from "@mui/material";

import { AppContext } from '../../context/AppContext';


const Home = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const { currentAccount, connectWallet , isStudent , getCandidates} = useContext(AppContext);
  
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const ImageContainer = useCallback(
    ({ alt, children, image }) => (
      <div className={classNames("mb-8 w-1/2", classes.companyImageContainer)}>
       
      </div>
    ),
    [classes]
  );
  


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
                <div className="md:col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Presidential Election</h5>
                            <h6 className="card-subtitle mb-2 text-muted">4 Candidates Running</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="/election" className="btn btn-primary">View Election</Link>
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

export default Home;
