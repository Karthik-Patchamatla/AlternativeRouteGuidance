import { useState, useEffect } from 'react';
import axios from 'axios';
import NavSidebar from '../components/Nav&Sidebar.jsx';

export default function UpdateProfile() {
    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        mobilenumber: '',
        birthday: '',
        address: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');

        if (email) {
            // Fetch the profile data
            axios.get(`http://localhost:8080/api/user/profile?email=${email}`)
                .then(response => {
                    setProfileData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching profile data:", error);
                    setError('Failed to fetch profile data');
                    setLoading(false);
                });
        } else {
            setError('Email not found in localStorage');
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = localStorage.getItem('userEmail');

        if (email) {
            // Send updated profile data
            axios.put(`http://localhost:8080/api/user/update?email=${email}`, profileData)
                .then(response => {
                    console.log("Profile updated successfully:", response.data);
                    alert('Profile updated successfully');
                })
                .catch(error => {
                    console.error("Error updating profile:", error);
                    alert('Failed to update profile');
                });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='flex'>
            <NavSidebar />
            <div className='w-full ml-72 pt-20'>
                <h1 className="text-2xl font-bold mb-2">Update Your Details</h1>
                <p className='text-sm mb-2'>Fill all details</p>
                <hr className="mb-4" />
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <table className="table-auto w-[500px]">
                            <tbody>
                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="firstname">First Name</label></td>
                                    <td>
                                        <input
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            value={profileData.firstname}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="lastname">Last Name</label></td>
                                    <td>
                                        <input
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            value={profileData.lastname}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="username">Username</label></td>
                                    <td>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={profileData.username}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="email">Email</label></td>
                                    <td>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                            disabled
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="mobilenumber">Mobile Number</label></td>
                                    <td>
                                        <input
                                            id="mobilenumber"
                                            name="mobilenumber"
                                            type="text"
                                            value={profileData.mobilenumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="birthday">Birthday</label></td>
                                    <td>
                                        <input
                                            id="birthday"
                                            name="birthday"
                                            type="date"
                                            value={profileData.birthday}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="address">Address</label></td>
                                    <td>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md"
                                            rows="4"
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-4">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
