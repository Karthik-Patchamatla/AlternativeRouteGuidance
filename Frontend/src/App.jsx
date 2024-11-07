import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import HomePage from './pages/Homepage.jsx';
import ViewProfile from './pages/ViewProfile.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage';

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
                <Route path="/home/search" element={<SearchPage />} />
                <Route path="home/search/search-results" element={<SearchResultsPage />} />
            </Routes>
        </Router>
    );
}
