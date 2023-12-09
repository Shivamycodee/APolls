import React from 'react'
import { useGlobalContext } from '../context/walletContext'

function NavComponent() {

    const { connectWallet, address, disconnectWallet } = useGlobalContext();

  return (
    <div>
      {address ? (
        <>
          <button>
            {address.slice(0, 4)}...{address.slice(38)}
          </button>
          <button style={{marginLeft:"10px"}} onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );

}

export default NavComponent