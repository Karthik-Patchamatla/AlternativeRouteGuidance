import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/argimage.png";
import { Link } from "react-router-dom";

export default function NavSidebar() {
  const user = useSelector((state) => state.auth);
  const [greeting, setGreeting] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTrainsOpen, setIsTrainsOpen] = useState(false);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    else if (hour >= 12 && hour < 17) return "Good Afternoon";
    else return "Good Evening";
  }

  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 h-12 md:h-12 lg:h-16 bg-white flex items-center px-4 md:px-8 shadow-md z-40">
        <div className="flex items-center space-x-4">
          {/* Mobile Hamburger */}
          <i
            className="fa-solid fa-bars sm:text-xl md:text-2xl lg:text-[0px] cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          ></i>

          {/* Logo in large screens */}
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-12 hidden lg:block ml-[-20px] mr-4"
          />
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm md:text-lg font-semibold text-gray-800">
            {greeting},
          </p>
          <p className="text-sm md:text-lg font-bold text-blue-600">
            {user.username || "Guest"}
          </p>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-2/5 md:w-2/4 lg:hidden bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <i
            className="fa-solid fa-xmark text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          ></i>
        </div>

        <div className="flex flex-col items-center space-y-4 p-4">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-24 md:h-32 md:w-40 rounded-full"
          />
          <h2 className="text-xl md:text-2xl font-bold text-gray-700">
            {user.username || "Guest"}
          </h2>
          <p className="text-sm md:text-lg text-gray-500">{greeting}</p>
        </div>

        {/* Sidebar Links */}
        <div className="p-4 space-y-4 md:p-6 text-gray-700">
          <Link to="/home" className="flex items-center space-x-3">
            <i className="fa-solid fa-gauge-high"></i>
            <span className="text-lg md:text-xl font-medium">Dashboard</span>
          </Link>

          {/* Profile Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsTrainsOpen(false);
              }}
            >
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-user"></i>
                <span className="text-lg md:text-xl font-medium">Profile</span>
              </div>
              <i className={`fa-solid ${isProfileOpen ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
            </div>
            {isProfileOpen && (
              <div className="ml-8 mt-2 space-y-2 text-sm md:text-lg">
                <Link to="/home/profile/viewprofile">View Profile</Link> <br />
                <Link to="/home/profile/updateprofile">Update Profile</Link> <br />
                <Link to="/home/profile/changepassword">Change Password</Link>
              </div>
            )}
          </div>

          {/* Trains Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsTrainsOpen(!isTrainsOpen);
                setIsProfileOpen(false);
              }}
            >
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-train"></i>
                <span className="text-lg md:text-xl font-medium">Trains</span>
              </div>
              <i className={`fa-solid ${isTrainsOpen ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
            </div>
            {isTrainsOpen && (
              <div className="ml-8 mt-2 space-y-2 text-sm md:text-lg">
                <Link to="/home/trains/searchtrains">Search Trains</Link>
              </div>
            )}
          </div>

          <Link to="/home/tickets" className="flex items-center space-x-3">
            <i className="fa-solid fa-ticket"></i>
            <span className="text-lg md:text-xl font-medium">Tickets</span>
          </Link>

          <Link to="/" className="flex items-center space-x-3">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="text-lg md:text-xl font-medium">Logout</span>
          </Link>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="w-64 fixed top-16 left-0 bg-[#f3f3f3] min-h-screen p-5 shadow-lg z-30">
          <div className="text-base font-bold mb-4">Menu</div>

          <div className="mb-4 flex items-center space-x-2">
            <i className="fa-brands fa-windows"></i>
            <Link to="/home">Dashboard</Link>
          </div>

          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsTrainsOpen(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
              </div>
              <i className={`fa-solid ${isProfileOpen ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
            </div>
            {isProfileOpen && (
              <div className="pl-6 mt-2 space-y-1 text-sm text-gray-700">
                <Link to="/home/profile/viewprofile">View Profile</Link> <br />
                <Link to="/home/profile/updateprofile">Update Profile</Link> <br />
                <Link to="/home/profile/changepassword">Change Password</Link>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsTrainsOpen(!isTrainsOpen);
                setIsProfileOpen(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-train"></i>
                <span>Trains</span>
              </div>
              <i className={`fa-solid ${isTrainsOpen ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
            </div>
            {isTrainsOpen && (
              <div className="pl-6 mt-2 space-y-1 text-sm text-gray-700">
                <Link to="/home/trains/searchtrains">Search Trains</Link>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <i className="fa-solid fa-ticket"></i>
            <Link to="/home/tickets">Tickets</Link>
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link to="/">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
