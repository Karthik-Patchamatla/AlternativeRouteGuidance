import { useSelector } from 'react-redux';
import NavSidebar from '../components/NavSidebar';

export default function ViewProfile() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      
      <NavSidebar />

      
      <div className="flex-1 lg:ml-64 px-4 pt-20 md:px-12 md:pt-24 pb-10">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
            About Me
          </h1>

          <table className="w-full table-auto text-sm sm:text-base">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 font-medium text-gray-600">First Name</td>
                <td className="py-3 text-gray-900">{user.firstName}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">Last Name</td>
                <td className="py-3 text-gray-900">{user.lastName}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">Username</td>
                <td className="py-3 text-gray-900">{user.username}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">Email</td>
                <td className="py-3 text-gray-900">{user.email}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">Phone</td>
                <td className="py-3 text-gray-900">{user.mobileNumber}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">Address</td>
                <td className="py-3 text-gray-900">{user.address}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">Birthday</td>
                <td className="py-3 text-gray-900">{user.birthday}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
