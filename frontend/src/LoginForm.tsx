import React, { useState } from 'react';
import './AuthForm.css'

async function checkUser(user) {
    const requestBody = JSON.stringify(user);
    const response = await fetch('http://localhost:3000/login', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: requestBody});

    if (!response.ok) {
      throw new Error(`Error login: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div className="card">
            <h2 className='title'>Login</h2>
            <form onSubmit={checkUser}>
                <div className="input-section">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-section">
                    <label >Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
