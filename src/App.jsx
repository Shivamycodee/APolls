import { useState,useEffect } from 'react'
import './App.css'
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
} from "anon-aadhaar-react";
import GETInputData from "./components/getInputParams";
import NavComponent from './components/navComponent.jsx';
import CenterComponent from './components/CenterComponent.jsx';
import { useGlobalContext } from './context/walletContext.jsx';
import ChartComp from './components/chartComp.jsx';

function App() {

  const [anonAadhaar] = useAnonAadhaar();
  const { setAnonStatus, setInputData } = useGlobalContext();
  
  const getInput = async(pcd)=>{
    const data = await GETInputData(pcd);
    setInputData(data);  
  }

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    setAnonStatus(anonAadhaar.status);

    if(anonAadhaar.pcd){
        getInput(anonAadhaar.pcd);
        localStorage.setItem("MyPCD", JSON.stringify(anonAadhaar.pcd));
    }
  }, [anonAadhaar]);


  return (
    <div style={{height:"100vh"}}>
      <nav style={{ position: "fixed", top: "20px", right: "10px" }}>
        <NavComponent />
      </nav>

      <div>
        {anonAadhaar?.status == "logged-in" ?   <CenterComponent /> : <LogInWithAnonAadhaar />}
      </div>
      {/* {anonAadhaar?.status == "logged-in" ? <p style={{bottom:"0",position:"fixed",left:"46%"}}>✅ Proof is valid</p>:null} */}
    

     <ChartComp/>

    </div>
  );

}

export default App
