import { useState, useEffect } from 'react';
import axios from 'axios';
import NavSidebar from '../components/Nav&Sidebar.jsx';

export default function ViewProfile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        
        if (email) {
            axios.get(`http://localhost:8080/api/user/profile?email=${email}`)
                .then(response => {
                    console.log("Profile data received:", response.data);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex">
            {/* Sidebar */}
            <NavSidebar />

            <div className="p-4 w-full ml-72 pt-20">
                {profileData ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">About Me</h1>
                        <table className="w-[500px] ">
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">First Name</td>
                                    <td className="px-4 py-2 text-center">{profileData.firstname}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">Last Name</td>
                                    <td className="px-4 py-2 text-center">{profileData.lastname}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">Username</td>
                                    <td className="px-4 py-2 text-center">{profileData.username}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">Email</td>
                                    <td className="px-4 py-2 text-center">{profileData.email}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">Phone</td>
                                    <td className="px-4 py-2 text-center">{profileData.mobilenumber}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">Address</td>
                                    <td className="px-4 py-2 text-center">{profileData.address}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-medium">Birthday</td>
                                    <td className="px-4 py-2 text-right">{profileData.birthday}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No profile data available.</p>
                )}
            </div>
        </div>
    );
}
