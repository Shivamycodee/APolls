import React from 'react'
import { useGlobalContext } from '../context/walletContext'
import Logo from '../assets/apolls-logo-f.jpg'

function NavComponent() {

    const { connectWallet, address, disconnectWallet, anonStatus } =
      useGlobalContext();

  return (
    <div>
      <img src={Logo} style={{width:"4%",height:"8%",position:"fixed",right:"90%"}} alt="logo" />
      <button style={{ marginRight: "10px" }}>Anon Status: {anonStatus}</button>
      {address ? (
        <>
          <button>
            {address.slice(0, 4)}...{address.slice(38)}
          </button>
          <button style={{ marginLeft: "10px" }} onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );

}

export default NavComponent