import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';

function Login(props) {
    const [loginAddress, setLoginAddress] = useState();

    function login() {
        if (["1234", "2345", "3456", "4567", "5678", "6789"].includes(loginAddress)) {
            props.setWalletAddress(loginAddress);
        } else {
            alert("Incorrect Pin Entered.");
        }
        setLoginAddress("");
    }

    return (
        <div className="App">
        <header className="Title">
            <h1>Educative Block Bank</h1>
        </header>
        <body>
            <div className="Login">
                <h1 className="LoginTitle">Enter Secret Pin to Login</h1>
                <div>
                    <form>
                        <input type="text" class="login-field" name="field1"
                            value={loginAddress} onChange={(e) => setLoginAddress(e.target.value)}
                        />
                    </form>
                </div>
                <div className="LoginButtonDiv">
                    <button className="SubmitButton" type="submit" onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        </body>
    </div>
    );
}

export default Login;