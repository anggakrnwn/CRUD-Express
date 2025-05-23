import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function UsersIndex() {
    const [users, setUsers] = useState([]);

    const fetchDataUsers = async () => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/api/admin/users');
                setUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    useEffect(() => {
        fetchDataUsers();
    }, []);

    const deleteUser = async (id) => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                await api.delete(`/api/admin/users/${id}`);
                fetchDataUsers();
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 mb-12 px-4">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                    <SidebarMenu />
                </div>
                <div className="md:w-3/4">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b flex justify-between items-center">
                            <h2 className="font-semibold text-lg">USERS</h2>
                            <Link to="/admin/users/create" className="px-3 py-1 bg-green-600 text-white text-sm rounded shadow hover:bg-green-700">ADD USER</Link>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <table className="min-w-full text-sm border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-800 text-white text-left">
                                        <th className="px-4 py-2 border border-gray-300">Full Name</th>
                                        <th className="px-4 py-2 border border-gray-300">Email Address</th>
                                        <th className="px-4 py-2 border border-gray-300 w-[17%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={index} className="border-t border-gray-200">
                                                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                                                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                                                <td className="px-4 py-2 border border-gray-300 text-center">
                                                    <Link to={`/admin/users/edit/${user.id}`} className="px-2 py-1 bg-blue-600 text-white rounded text-xs mr-2 hover:bg-blue-700">EDIT</Link>
                                                    <button onClick={() => deleteUser(user.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">DELETE</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-4 py-4 text-center">
                                                <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
                                                    Data Belum Tersedia!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
