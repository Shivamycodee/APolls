import { useState,useEffect } from 'react'
import './App.css'
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import GETInputData from "./components/getInputParams";
import { ethers, providers } from "ethers";
import Data from "./assets/data.js";
import VOTE_CONTRACT_ABI from "./abi/Vote.json"
import NavComponent from './components/navComponent.jsx';

const userChoice = [
      "Elon Musk",
      "MR BEAN",
      "OSHO",
      "ARTIFICIAL INTELLIGENCE",
    ];

function App() {

  const [anonAadhaar] = useAnonAadhaar();
  const [inputData, setInputData] = useState({});
  
  const getInput = async(pcd)=>{
    const data = await GETInputData(pcd);
    setInputData(data);  
  }

  const GiveYourVote = async()=>{

    alert("r u ready to give your vote?")

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      Data.VOTE_CONTRACT_ADDRESS,
      VOTE_CONTRACT_ABI,
      signer
    );

    const tx = await contract.voteForProposal(
      0,
      inputData.a,
      inputData.b,
      inputData.c,
      inputData.Input
    );
 
    console.log(tx.hash);
    await tx.wait();
    console.log("Vote given");

  }

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    if(anonAadhaar.pcd){
      getInput(anonAadhaar.pcd);
    }
  }, [anonAadhaar]);

  useEffect(()=>{
    if(inputData){
      console.log("Input Data: ");
      console.log(inputData);
    }
  },[inputData])

  return (
    <>
    <nav style={{position:"fixed",top:"20px",right:"10px"}}>
       <NavComponent />
    </nav>

      <div>

        <p>User Status: {anonAadhaar?.status}</p>
        <LogInWithAnonAadhaar />
      </div>
      <div>
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            {/* <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} /> */}
          </>
        )}
        <button onClick={()=>GiveYourVote()}>Vote now</button>
      </div>
    </>
  );

}

export default App
