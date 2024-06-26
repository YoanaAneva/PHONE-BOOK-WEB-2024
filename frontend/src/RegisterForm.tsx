import React, { useState } from 'react';
import './AuthForm.css'

async function addUser(user) {
    const requestBody = JSON.stringify(user);
    const response = await fetch('http://localhost:3000/Register', {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: requestBody});

    if (!response.ok) {
      throw new Error(`Error register: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div className="card">
            <h2 className='title'>Register</h2>
            <form onSubmit={addUser}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
