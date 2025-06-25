import React, { useState } from 'react';
import NavSidebar from '../components/NavSidebar';

export default function UpdateProfile() {
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    mobilenumber: '',
    birthday: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {};

  return (
    <div className="flex">
      <NavSidebar />
      <div className="w-full px-4 md:px-8 pt-16 lg:ml-72 lg:pt-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Update Your Details</h1>
        <p className="text-sm text-gray-600 mb-4">Fill all details below to update your profile.</p>
        <hr className="mb-6" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstname" className="block mb-1 font-medium text-sm text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={profileData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block mb-1 font-medium text-sm text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={profileData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block mb-1 font-medium text-sm text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-sm text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="mobilenumber" className="block mb-1 font-medium text-sm text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobilenumber"
                name="mobilenumber"
                value={profileData.mobilenumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="birthday" className="block mb-1 font-medium text-sm text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={profileData.birthday}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block mb-1 font-medium text-sm text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
