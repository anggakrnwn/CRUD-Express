import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import SidebarMenu from '../../../components/SidebarMenu';

const token = Cookies.get('token');

export default function UsersCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);

  const storeUser = async (e) => {
    e.preventDefault();
    api.defaults.headers.common['Authorization'] = token;

    try {
      await api.post('/api/admin/users', {
        name,
        email,
        password
      });
      navigate('/admin/users');
    } catch (error) {
      setValidation(error.response.data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    
        <div>
          <SidebarMenu />
        </div>

     
        <div className="md:col-span-3">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
         
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-800">Add User</h1>
            </div>

        
            <div className="px-6 py-6">
              {validation.errors && (
                <div className="bg-red-100 text-red-700 px-4 py-3 mb-4 rounded">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      <span className="font-semibold">{error.path}</span>: {error.msg}
                    </p>
                  ))}
                </div>
              )}

              <form onSubmit={storeUser} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded shadow-sm transition duration-200"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
