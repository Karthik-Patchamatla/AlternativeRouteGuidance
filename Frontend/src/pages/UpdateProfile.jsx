import NavSidebar from '../components/NavSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/slices/AuthSlice.js';

export default function UpdateProfile() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    mobilenumber: '',
    birthday: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstname: user.firstName || '',
        lastname: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        mobilenumber: user.mobileNumber || '',
        birthday: user.birthday || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        username: profileData.username,
        email: profileData.email,
        mobilenumber: profileData.mobilenumber,
        birthday: profileData.birthday,
        address: profileData.address,
      };

      const res = await axios.post(
        `${BASE_URL}/api/updateprofile`,
        updatedData
      );

      alert("Profile updated successfully!");
      // console.log(res.data.user);
      dispatch(setUserDetails(res.data.user))
      navigate("/home/profile/viewprofile");
    } catch (error) {
      console.error(error);
    }
  };

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
                // required
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
