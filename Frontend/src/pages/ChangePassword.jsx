import { useState } from 'react';
import axios from 'axios';
import NavSidebar from '../components/Nav&Sidebar.jsx';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        const email = localStorage.getItem('userEmail');
        if (!email) {
            setError('No user email found.');
            return;
        }

        // Send request to verify old password and update to the new one
        axios.post('http://localhost:8080/api/user/change-password', {
            email,
            oldPassword,
            newPassword,
        })
        .then(response => {
            setSuccess('Password updated successfully.');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        })
        .catch(error => {
            setError(error.response?.data?.error || 'An error occurred while changing password.');
        });
    };

    return (
        <div className='flex'>
            <NavSidebar />
            <div className='w-full ml-72 pt-20'>
                <h1 className="text-2xl font-bold mb-2">Change Password</h1>
                <p className='text-sm mb-2'>Update your password</p>
                <hr className="mb-4" />

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <table className="table-auto w-[500px]">
                            <tbody>
                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="oldPassword">Old Password</label></td>
                                    <td>
                                        <input
                                            id="oldPassword"
                                            name="oldPassword"
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="newPassword">New Password</label></td>
                                    <td>
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="block text-sm font-medium" htmlFor="confirmPassword">Confirm New Password</label></td>
                                    <td>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}

                        <div className="mt-4">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Change Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
