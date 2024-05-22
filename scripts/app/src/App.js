import React, { useState } from 'react'
import Home from "./Home";
import Login from "./Login";
import './App.css';


function App() {
    const [walletAddress, setWalletAddress] = useState();


    return (
         <div>
            {walletAddress ? (<Home setWalletAddress={setWalletAddress} walletAddress={walletAddress} />) : (<Login setWalletAddress={setWalletAddress} />)};
        </div>
    );
}

export default App;
