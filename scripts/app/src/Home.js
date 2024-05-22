import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'reactjs-popup/dist/index.css';

function Home(props) {
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [bankBalance, setBankBalance] = useState();
    const [receiverAddress, setReceiverAddress] = useState();
    const [transferAmount, setTransferAmount] = useState();

    useEffect(() => {
        refreshBalance();
        getTransaction();
    }, [props.walletAddress]);
    
    function logout() {
        props.setWalletAddress("");
        setBankBalance("");
        setTransactionHistory([]);
        setReceiverAddress("");
        setTransferAmount("");
    }

    function refreshBalance() {
        let headers = {
            wallet: props.walletAddress
        };
        axios.get('/balance', { headers })
            .then((response) => {
                const res = response.data
                setBankBalance(res.amount)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    function sendFunds() {
        let headers = {
            wallet: props.walletAddress,
            sendTo: receiverAddress,
            amount: transferAmount
        };

        axios.get('/transfer', { headers })
            .then((response) => {
                const res = response.data
                if (res.status) {
                    alert('Transaction Successful');
                    refreshBalance();
                    getTransaction();
                }
            }).catch((error) => {
                alert('Error!');
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    function getTransaction() {
        const headers = {
            wallet: props.walletAddress
        };

        axios.get('/history', { headers })
            .then((response) => {
                const res = response.data
                setTransactionHistory(res.transactions)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    return (
         <div className="App">
            <header className="Title">
                <h1>Educative Block Bank</h1>
                <div className="LogoutButtonDiv">
                    <button className="SubmitButton" type="submit" onClick={logout}>
                        Logout
                    </button>
                </div>
            </header>
            <body>
                <div className="GridContainer">
                    <div className="GridChild">
                        <h1 className="CardTitle">Account Balance</h1>
                        <div className="AccountBalance">
                            <p>{bankBalance} ETH</p>
                            <button
                                className="RefreshButton"
                                type="submit"
                                onClick={refreshBalance}
                            >
                                <img
                                    src="refresh.png"
                                    alt="Refresh Button"
                                    height="16"
                                    width="16"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="GridChild">
                        <h1 className="CardTitle">Funds Transfer</h1>
                        <div class="form-style-3">
                            <form>
                                <label>
                                    <span>
                                        Wallet Address <span class="required">*</span>
                                    </span>
                                    <input
                                        type="text"
                                        class="input-field"
                                        name="field1"
                                        value={receiverAddress}
                                        onChange={(e) => setReceiverAddress(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <span>Reason for Transaction</span>
                                    <select name="field4" class="select-field">
                                        <option value="Appointment">Online Purchases</option>
                                        <option value="Interview">Family Support</option>
                                        <option value="Regarding a post">Others</option>
                                    </select>
                                </label>
                                <label>
                                    <span>
                                        Amount <span class="required">*</span>
                                    </span>
                                    <input
                                        type="number"
                                        class="input-field"
                                        name="field2"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                    />
                                </label>
                            </form>
                        </div>
                        <div className="ButtonDiv">
                            <button
                                className="SubmitButton"
                                type="submit"
                                onClick={sendFunds}
                            >
                                Send Funds
                            </button>
                        </div>
                    </div>
                </div>
                <br></br>

                <div className="GridChild2">
                    <h1 className="CardTitle">Transaction History</h1>
                    {transactionHistory.map((transact, index) => (
                        <div className="TransactionHistory">
                            <p>Transaction ID: {transact.id}</p>
                            <p>Amount: {transact.amount} ETH</p>
                            <p>Transferred to: {transact.sentTo}</p>
                        </div>
                    ))}
                </div>
            </body>
        </div>
    );
}

export default Home;