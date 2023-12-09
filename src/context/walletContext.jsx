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
    "0x0dF00373c8Be49608111D7B886eD109336575ffE",
    ABI,
    signer
  );
  return contract;
};

export default function WalletContextProvider({ children }) {

    const [address, setAddress] = useState(null);

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



  useEffect(() => {
    if (window.ethereum) {
  
    }
  }, [address]);

  return (
    <walletContext.Provider
      value={{
        connectWallet,
        address,
        disconnectWallet,
      }}
    >
      {children}
    </walletContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(walletContext);
}
