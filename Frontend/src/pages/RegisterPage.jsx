import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/argimage.png";
import "animate.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/slices/AuthSlice.js";
import { BASE_URL } from "../config.js";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  // State to handle success popup visibility
  const [isRegistered, setIsRegistered] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/register`,
        formData
      );
      console.log(response.data.message);
      setIsRegistered(true); // Show the success popup
      dispatch(
        setUserDetails({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          password: formData.password,
        })
      );
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // Close the popup and redirect to login page
  const handleClosePopup = () => {
    setIsRegistered(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-24" />
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 mt-6 hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Registration Success Popup */}
      {isRegistered && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Registration Successful!
            </h2>
            <p className="text-gray-700 mt-4">
              Your account has been created successfully.
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-6 bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
