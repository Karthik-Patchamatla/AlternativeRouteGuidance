import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import logo from '../assets/argimage.png';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
            console.log(response.data.message);

            navigate('/home', { replace: true });
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'An error occurred during login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-96">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-24" />
                </div>

                {/* Text message */}
                <div className="text-center mb-4">
                    <p className="text-lg font-semibold text-gray-700">Please enter your information</p>
                </div>
                
                {/* Display error message if credentials are incorrect */}
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={email}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={password}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {/* Forgot Password */}
                    <div className="flex justify-end mt-2">
                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot Password?</p>
                    </div>

                    {/* Buttons side by side */}
                    <div className="flex mt-6 space-x-4">
                        <button 
                            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
