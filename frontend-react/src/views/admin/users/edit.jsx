import { useState, useEffect } from "react";

import SidebarMenu from "../../../components/SidebarMenu";

import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

import api from "../../../services/api";

const token = Cookies.get("token");

export default function UsersEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  const fetchDetailUser = async () => {
    await api.get(`/api/admin/users/${id}`).then((response) => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    });
  };

  useEffect(() => {
    fetchDetailUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    api.defaults.headers.common["Authorization"] = token;
    await api
      .put(`/api/admin/users/${id}`, { name, email, password })
      .then(() => {
        navigate("/admin/users");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <SidebarMenu />
        </div>
        <div className="w-full lg:w-3/4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">EDIT USER</h2>

            {validation.errors && (
              <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                {validation.errors.map((error, index) => (
                  <p key={index} className="text-sm">
                    {error.path} : {error.msg}
                  </p>
                ))}
              </div>
            )}

            <form onSubmit={updateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
