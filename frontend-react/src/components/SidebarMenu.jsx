import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700">
        MAIN MENU
      </div>
      <div className="flex flex-col">
        <Link
          to="/admin/dashboard"
          className="px-4 py-2 hover:bg-blue-100 text-blue-700 hover:text-blue-900 transition rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="px-4 py-2 hover:bg-blue-100 text-blue-700 hover:text-blue-900 transition rounded"
        >
          Users
        </Link>

        <button
          onClick={logout}
          type="button"
          className="text-left px-4 py-2 hover:bg-red-100 text-red-600 hover:text-red-800 transition rounded focus:outline-none focus:ring-2 focus:ring-red-400 mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
