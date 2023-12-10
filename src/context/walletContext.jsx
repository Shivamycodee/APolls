import React, { useContext, useState, useEffect } from "react";
import { ethers, providers } from "ethers";
import VOTE_CONTRACT_ABI from "../abi/Vote.json";
import DATA from "../assets/data.js";


const walletContext = React.createContext();

const getContract = () => {
  if (!window.ethereum) return;
  const provider = new providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    DATA.VOTE_CONTRACT_ADDRESS,
    VOTE_CONTRACT_ABI,
    signer
  );
  return contract;
};

export default function WalletContextProvider({ children }) {

    const [address, setAddress] = useState(null);
    const [pollQuestion, setPollQuestion] = useState(null);
    const [pollOptions, setPollOptions] = useState([]);
    const [anonStatus, setAnonStatus] = useState(false);
    const [inputData, setInputData] = useState({});
    const [hasVoted,setHasVoted] = useState();


    const connectWallet = async () => {
      new providers.Web3Provider(window.ethereum);
      const add = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(add[0]);
    };

    const disconnectWallet = async () => {
      setAddress(null);
    };

    const getPollQuestion = async () => {

      const contract = getContract();
      const question = await contract.votingQuestion();
      setPollQuestion(question);
    }

    const getPollOptions = async () => {

      const contract = getContract();
      const res = await contract.getAllProposals();

      let arr = [];
      for(let i=0;i<res.length;i++){
         arr.push(res[i][0].toString());
      }
      setPollOptions(arr);
    }

 const GiveYourVote = async(index)=>{


  if(hasVoted){
     alert("You have already Voted. Scroll 👇 to see the current results")
     return;
    }

   const contract = getContract();
   try{ 
   await contract.voteForProposal(
      index,
      inputData.a,
      inputData.b,
      inputData.c,
      inputData.Input
      );  
      setHasVoted(true);
    }catch(e){
      console.error("Voting Error: ",e);
  }
  }

const hasUserVoted = async()=>{
  const contract = getContract();
  const flag = await contract.checkVoted(address);
  console.log("flag : ",flag)
  setHasVoted(flag);

}


  useEffect(() => {
    // connectWallet();
    if(address){
      getPollQuestion();
      getPollOptions();
      hasUserVoted();
    }
  }, [address]);

  return (
    <walletContext.Provider
      value={{
        connectWallet,
        address,
        disconnectWallet,
        pollQuestion,
        pollOptions,
        setAnonStatus,
        anonStatus,
        GiveYourVote,
        setInputData,
        hasVoted,
      }}
    >
      {children}
    </walletContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(walletContext);
}
