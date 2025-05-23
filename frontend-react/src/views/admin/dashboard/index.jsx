import SidebarMenu from "../../../components/SidebarMenu";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/4 px-4 mb-6 md:mb-0">
          <SidebarMenu />
        </div>
        <div className="w-full md:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-xl font-semibold mb-4 border-b pb-2">
              DASHBOARD
            </div>
            <div className="text-gray-700">
              Selamat Datang, <strong>{user?.name}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
