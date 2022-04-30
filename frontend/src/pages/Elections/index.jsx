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
  const [electionBool, setElectionBool] = useState(false);
  const { currentAccount, connectWallet , getCandidates, elections, isCreated} = useContext(AppContext);
  
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

  console.log(elections);

  useEffect(() => {
    if(isCreated){
      window.location.href= "/election";
      return;
    }else{
      if(elections.length > 0){
        setElectionBool(true);
      }
    }
  }, []);

  
  


  return (
    <main>
      <section
        className={classNames(
          globalStyles.px,
          classes.hero,
          "bg-no-repeat flex flex-col pb-2"
        )}
      >

        
        {electionBool ? 
          elections.map((election, index)=>{  <div className="container">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{election.name}</h5>
                            <p className="card-text">{election.description}</p>
                            <Link to="/election" className="btn btn-primary">View Election</Link>
                        </div>
                    </div>
                </div>
            </div>
          }) : (
            <div className="container">
                <div className="row">
                    <div className="display-3">
                        There are no elections at the moment
                    </div>
                </div>
            </div>
        )} 
        
        
      </section>
     
    </main>
  );
};

export default Home;
