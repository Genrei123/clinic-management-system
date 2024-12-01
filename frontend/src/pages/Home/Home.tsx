import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import PatientProfileModal from "./PatientProfileModal";
import useModal from "./useModal";

const Home: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Patient Profile Created:\nName: ${formData.name}\nAge: ${formData.age}`);
    closeModal();
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
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Scan QR Code
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                onClick={openModal}
              >
                Create Patient Profile
              </button>
            </div>

            {/* Services Table */}
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

              {/* Recent Patients Table */}
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

      <PatientProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={formData}
        onInputChange={handleInputChange}
        onNewPatientSubmit={() => {}}
        onVisitSubmit={() => {}}
      />
    </div>
  );
};

export default Home;
