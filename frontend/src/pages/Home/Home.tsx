import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import PatientProfileModal from "./PatientProfileModal";
import useModal from "./useModal";
import { Maximize2, Minimize2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Patient from "../../types/Patient";
import { createEmptyPatient } from "../../utils/Patient";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState<Patient>(createEmptyPatient());
  const [fullscreenTable, setFullscreenTable] = useState<
    "services" | "patients" | null
  >(null);
  const [patients, setPatients] = useState<any[]>([]); // State for patients
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getPatient");
        console.log(response.data); // Check the structure of the response
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const toggleFullscreen = (table: "services" | "patients") => {
    setFullscreenTable(fullscreenTable === table ? null : table);
  };

  const handleViewClick = (id: number) => {
    navigate(`/patient/${id}`);
  };

  const renderTable = (tableType: "services" | "patients") => {
    const isFullscreen = fullscreenTable === tableType;
    const tableClass = `bg-white rounded-lg shadow-md overflow-hidden ${
      isFullscreen ? "fixed inset-0 z-50 flex flex-col" : ""
    }`;

    return (
      <div className={tableClass}>
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h2
            className={`font-semibold text-gray-800 ${
              isFullscreen ? "text-2xl lg:text-3xl" : "text-xl"
            }`}
          >
            {tableType === "services" ? "Services" : "Recent Patients"}
          </h2>
          <button
            onClick={() => toggleFullscreen(tableType)}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className={`p-6 ${isFullscreen ? "flex-grow overflow-auto" : ""}`}>
          <div className="overflow-x-auto">
            <table
              className={`w-full table-auto ${
                isFullscreen ? "text-base lg:text-lg" : "text-sm"
              }`}
            >
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase leading-normal">
                  {tableType === "services" ? (
                    <>
                      <th className="py-3 px-6 text-left">Service Offers</th>
                      <th className="py-3 px-6 text-left">Branch</th>
                      <th className="py-3 px-6 text-right">Price</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-6 text-center">No</th>
                      <th className="py-3 px-6 text-left">Date In</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-center">Gender</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="text-gray-600 font-light">
                {tableType === "services" ? (
                  // Hardcoded data for services table
                  <>{/* Add your services rows here */}</>
                ) : loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : Array.isArray(patients) && patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <tr
                      key={patient.patientID}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-center">{index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        {new Date(
                          patient.consultation.consultation_date
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-left">{`${patient.givenName} ${patient.lastName}`}</td>
                      <td className="py-3 px-6 text-center">
                        {patient.sex === "M" ? "Male" : "Female"}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-xs transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => handleViewClick(patient.clientID)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Dashboard
            </h1>
            <div className="flex justify-end space-x-4 mb-8">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                Scan QR Code
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={openModal}
              >
                Create Patient Profile
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderTable("services")}
              {renderTable("patients")}
            </div>
          </div>
        </main>
      </div>
      <PatientProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={formData}
      />
    </div>
  );
};

export default Home;
