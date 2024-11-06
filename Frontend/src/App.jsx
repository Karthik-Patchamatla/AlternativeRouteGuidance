import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import HomePage from './pages/Homepage.jsx';
import ViewProfile from './pages/ViewProfile.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/home/profile" element={<ViewProfile />} />
                <Route path="/home/updateprofile" element={<UpdateProfile />} />
                <Route path="/home/change-password" element={<ChangePassword />} />
            </Routes>
        </Router>
    );
}
