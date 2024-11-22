import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Placeholder for form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData); // Placeholder action
    alert(`Patient Profile Created:\nName: ${formData.name}\nAge: ${formData.age}`);
    setIsModalOpen(false);
    setFormData({ name: "", age: "" }); // Reset form
  };

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
                Scan QR Code
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg"
                onClick={openModal}
              >
                Create Patient Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Create Patient Profile</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Patient Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter patient name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter age"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
