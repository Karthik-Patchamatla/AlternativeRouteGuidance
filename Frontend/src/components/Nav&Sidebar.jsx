import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../assets/trainlogo.png';

export default function Layout() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isTrainsOpen, setIsTrainsOpen] = useState(false);
    const [isTicketsOpen, setIsTicketsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [greeting, setGreeting] = useState('');

    const toggleProfile = () => {
        // Close other toggles and open Profile
        setIsProfileOpen(!isProfileOpen);
        setIsTrainsOpen(false);
        setIsTicketsOpen(false);
    };
    
    const toggleTrains = () => {
        // Close other toggles and open Trains
        setIsTrainsOpen(!isTrainsOpen);
        setIsProfileOpen(false);
        setIsTicketsOpen(false);
    };
    
    const toggleTickets = () => {
        // Close other toggles and open Tickets
        setIsTicketsOpen(!isTicketsOpen);
        setIsProfileOpen(false);
        setIsTrainsOpen(false);
    };

    useEffect(() => {
        // Set the greeting based on the current time
        const hours = new Date().getHours();
        if (hours < 12) {
            setGreeting('Good Morning');
        } else if (hours < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }

        // Get the username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="flex flex-col">
            {/* Navbar - Fixed to the top */}
            <div className="w-full h-14 fixed top-0 bg-white flex justify-between items-center px-10 z-10 shadow-md">
                <div>
                    <img src={homelogo} alt="Home Logo" className="h-14" />
                </div>
                <div>
                    <p className="ml-28 text-lg font-semibold">{`${greeting}, ${username || 'Guest'}`}</p>
                </div>
                <div className="ml-auto">
                    <p className="cursor-pointer text-lg">Contact Us</p>
                </div>
            </div>

            {/* Sidebar - Positioned below the navbar */}
            <div className="w-64 fixed top-0 bg-[#f3f3f3] min-h-screen p-5 mt-14">
                {/* Title Section */}
                <div className="text-sm font-bold mb-4 ">
                    <h1>Menu</h1>
                </div>

                {/* Dashboard Section */}
                <div className="mb-6 space-x-2">
                    <i className="fa-brands fa-windows"></i>
                    <Link to="/dashboard" className="text-base mb-2 w-full">
                        Dashboard
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="mb-4 space-x-2">
                    <i className="fa-solid fa-user"></i>
                    <Link
                        to="#"
                        onClick={toggleProfile}
                        className="text-base mb-2 w-full"
                    >
                        Profile
                        <i className={`ml-32 fa-solid ${isProfileOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </Link>
                    {isProfileOpen && (
                        <div className="pl-4">
                            <div className="my-2">
                                <Link to="/home/profile" className="">
                                    View Profile
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link to="/profile/update" className="">
                                    Update Profile
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link to="/profile/change-password" className="">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Trains Section */}
                <div className="mb-4 space-x-2">
                    <i className="fa-solid fa-train"></i>
                    <Link to="#" onClick={toggleTrains} className="mb-2 w-full text-left">
                        Trains
                        <i className={`ml-[132px] fa-solid ${isTrainsOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </Link>
                    {isTrainsOpen && (
                        <div className="pl-4">
                            <div className="my-2">
                                <Link to="/trains/search" className="">
                                    Search Trains
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tickets Section */}
                <div className="mb-4 space-x-2">
                    <i className="fa-solid fa-ticket"></i>
                    <Link
                        to="#"
                        onClick={toggleTickets}
                        className="text-base mb-2 w-full text-left"
                    >
                        Tickets
                        <i className={`ml-[120px] fa-solid ${isTicketsOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </Link>
                    {isTicketsOpen && (
                        <div className="pl-4">
                            <div className="my-2">
                                <Link to="/profile" className="">
                                    Booked Trains
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link to="/profile/update" className="">
                                    Booked Tickets
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Logout Section */}
                <div className="mb-4 space-x-2">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <Link to="/" className="text-base mb-2 w-full">
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
