import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WalletContextProvider from "../src/context/walletContext.jsx"
import { AnonAadhaarProvider } from "anon-aadhaar-react";


// Function to generate a random hexadecimal string of a given length
function generateRandomHex(length) {
  const values = new Uint8Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

// const app_id = BigInt("0x" + generateRandomHex(20)).toString(); // random value.
const app_id = "546402315823770473405617073328588710295156302823";

console.log("App ID: ", app_id);

ReactDOM.createRoot(document.getElementById("root")).render(

  <AnonAadhaarProvider _appId={app_id}>
    <React.StrictMode>
      <WalletContextProvider>
      <App />
    </WalletContextProvider>
    </React.StrictMode>
  </AnonAadhaarProvider>
);
