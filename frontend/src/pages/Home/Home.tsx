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
import { getPatientLogs } from "../../services/visitService";
import ScanQRCodeModal from "./ScanQRCodeModal";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState<Patient>(createEmptyPatient());
  const [fullscreenTable, setFullscreenTable] = useState<
    "services" | "patients" | null
  >(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]); // State for services
  const [loadingPatients, setLoadingPatients] = useState<boolean>(true);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);

  // Fetch patients and services from the backend
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("username");

    if (storedToken) {
      setToken(storedName);
    }

    if (!storedToken || !storedRole) {
      navigate("/login");
      return;
    }

    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getPatient", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoadingPatients(false);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/service/getServices", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const formattedServices = response.data.map((service: any) => ({
          name: service.service_name,
          branch: service.branch || "Main Branch", // Assume default branch if not provided
          price: service.service_price,
        }));
        setServices(formattedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchPatients();
    fetchServices();
  }, [navigate]);

  const toggleFullscreen = (table: "services" | "patients") => {
    setFullscreenTable(fullscreenTable === table ? null : table);
  };

  const handleViewClick = (id: number) => {
    navigate(`/patient/${id}`);
  };

  const handleScanResult = (result: string) => {
    setQRCodeModalOpen(false);
    alert(`Scanned QR Code: ${result}`);
    navigate(`/patient/${result}`);
    // Additional logic can be added here for processing the scanned QR code
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
                      <th className="py-3 px-6 text-left">Service Name</th>
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
                  loadingServices ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : services.length > 0 ? (
                    services.map((service, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-6 text-left">{service.name}</td>
                        <td className="py-3 px-6 text-left">{service.branch}</td>
                        <td className="py-3 px-6 text-right">${service.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No services available.
                      </td>
                    </tr>
                  )
                ) : loadingPatients ? (
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
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-xs transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
              Welcome, {token} !
            </h1>
            <div className="flex justify-end space-x-4 mb-8">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => setQRCodeModalOpen(true)}
              >
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

      <ScanQRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setQRCodeModalOpen(false)}
        onScanResult={handleScanResult}
      />
    </div>
  );
};

export default Home;