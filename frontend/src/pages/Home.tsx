import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navbar */}
        <Navbar />

        <div className="p-6 space-y-6">
          {/* Services Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Service Offers</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Branch</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: "Laboratory Examinations", branch: "Phase 7", price: "3000P" },
                  { service: "Vaccination", branch: "Phase 10", price: "300P" },
                  { service: "X-Ray", branch: "Phase 11", price: "500P" },
                  { service: "Child Delivery", branch: "Phase 7", price: "1000P" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.service}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.branch}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Patients Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Patients</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">Date In</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Gender</th>
                  <th className="border border-gray-300 px-4 py-2">More Info</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { no: 1, date: "05.07.2024", name: "Franches Ories", gender: "Female" },
                  { no: 2, date: "06.07.2024", name: "Lynild Ayalay", gender: "Male" },
                  { no: 3, date: "05.07.2024", name: "Franches Ories", gender: "Female" },
                  { no: 4, date: "05.07.2024", name: "Franches Ories", gender: "Female" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.no}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Total Employees</h3>
                <p className="text-3xl font-bold">3</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Patients Pending</h3>
                <p className="text-3xl font-bold">3</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg">
                Generate QR Code
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg">
                Create Patient Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
