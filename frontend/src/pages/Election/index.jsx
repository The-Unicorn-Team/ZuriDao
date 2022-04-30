import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { contractAddress } from '../constants/constant';
import abi from '../constants/abi.json';
import { Card, Col, Row } from 'antd';

const { ethereum } = window;

const Election = () => {
  const [contenders, setContenders] = useState([]);
  const [candidatesBool, showCandidates] = useState(false);

  // fetch contract
  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const ZuriContract = new ethers.Contract(contractAddress, abi.abi, signer);

    return ZuriContract;
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
        _id: item.id,
        name: item.name,
        votes: Number(ethers.utils.hexValue(item.voteCount._hex).slice(2)),
        hash : item.candidateHash,
      });
      console.log(candidateArray[0]._id._hex);
      setContenders(candidateArray);
      console.log(candidateArray);
      // console.log(contenders)
    });
  };

  const voteCandidate = async (id) => {
    const contract = createEthereumContract();

    try {

      await contract.vote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const manifesto = "My purpose is to unite the world through sport to create a healthy planet, active communities and an equal playing field for all."
  useEffect(() => {
    fetch();
  }, [showCandidates]);

  return (
    <main>
      <section>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-end">
              <button className="btn btn-lg btn-danger me-2" onClick={() => showCandidates(true)}>
                View Candidates
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-5 gap-4 py-5">
          {candidatesBool && contenders.map((contender, index) => (
            <div key={index} class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <img class="rounded-t-lg " src={"https://ipfs.infura.io/ipfs/" +contender.hash} alt={`${contender.name} with ${contender.votes} votes`} />
              <div class="px-3 py-2">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{contender.name}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{contender.votes} votes</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{manifesto}</p>
                <button onClick={() => {
                  voteCandidate(contender._id);
                  // console.log(contender._id)
                }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 rounded-full">
                  Vote Candidate
                </button>
              </div>
            </div>

          ))}
        </div>
      </section>
    </main>
  );
};

export default Election;
