import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", age: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Patient Profile Created:\nName: ${formData.name}\nAge: ${formData.age}`);
    setIsModalOpen(false);
    setFormData({ name: "", age: "" });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <div className="flex justify-end space-x-4 mb-8">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Scan QR Code
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                onClick={openModal}
              >
                Create Patient Profile
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Services</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Service Offers</th>
                          <th className="py-3 px-6 text-left">Branch</th>
                          <th className="py-3 px-6 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {[
                          { service: "Laboratory Examinations", branch: "Phase 7", price: "3000P" },
                          { service: "Vaccination", branch: "Phase 10", price: "300P" },
                          { service: "X-Ray", branch: "Phase 11", price: "500P" },
                          { service: "Child Delivery", branch: "Phase 7", price: "1000P" },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{item.service}</td>
                            <td className="py-3 px-6 text-left">{item.branch}</td>
                            <td className="py-3 px-6 text-right">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Patients</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-center">No</th>
                          <th className="py-3 px-6 text-left">Date In</th>
                          <th className="py-3 px-6 text-left">Name</th>
                          <th className="py-3 px-6 text-center">Gender</th>
                          <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {[
                          { no: 1, date: "05.07.2024", name: "Franches Ories", gender: "Female" },
                          { no: 2, date: "06.07.2024", name: "Lynild Ayalay", gender: "Male" },
                          { no: 3, date: "05.07.2024", name: "Franches Ories", gender: "Female" },
                          { no: 4, date: "05.07.2024", name: "Franches Ories", gender: "Female" },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-center">{item.no}</td>
                            <td className="py-3 px-6 text-left">{item.date}</td>
                            <td className="py-3 px-6 text-left">{item.name}</td>
                            <td className="py-3 px-6 text-center">{item.gender}</td>
                            <td className="py-3 px-6 text-center">
                              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-xs transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Create Patient Profile
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient Name</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter patient name"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter age"
                          />
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;