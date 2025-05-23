import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api'

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);

    const register = async (e) => {
        e.preventDefault();
        await api.post('/api/register', {
            name: name,
            email: email,
            password: password,
        })
        .then(() => {
            navigate("/login");
        })
        .catch(error => {
            setValidation(error.response.data);
        })
    };

     return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-2xl font-bold mb-4">REGISTER</h4>
          <hr className="mb-4" />

          {validation.errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {validation.errors.map((error, index) => (
                <p key={index} className="text-sm">
                  <span className="font-semibold">{error.path}</span> : {error.msg}
                </p>
              ))}
            </div>
          )}

          <form onSubmit={register}>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

