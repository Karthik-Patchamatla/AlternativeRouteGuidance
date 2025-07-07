import React, { useState } from 'react';
import NavSidebar from '../components/NavSidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../config';
import { setUserDetails } from '../redux/slices/AuthSlice.js';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const user = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(profileData.oldPassword!=user.password) {
      alert("password unmatched"); 
      retrun;
    }

    try {
      const updatedData = {
        email: user.email,
        password: profileData.newPassword
      };

      const res = await axios.post(
        `${BASE_URL}/api/updatepassword`,
        updatedData
      );

      alert("Password updated successfully!");
      // console.log(res.data.user);
      dispatch(setUserDetails(res.data.user))
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-0 lg:pt-20">
      
      <NavSidebar />

      <div className="flex-1 lg:ml-64 p-4 md:p-8 pt-20">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">Change Password</h1>
          <p className="text-sm text-gray-500 mb-4">Update your account password</p>
          <hr className="mb-6" />

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">

              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={profileData.oldPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
