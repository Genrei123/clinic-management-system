import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { ChevronLeft, ChevronRight, Users, Search, Filter, RefreshCw } from "lucide-react";
import { getPatients } from "../../services/patientService"; // Adjust the path to your service file
import Patient from "../../types/Patient";

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
  `${patient.givenName || ""} ${patient.lastName || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (patient.address || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
  (patient.religion || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewClick = (id: number) => {
    navigate(`/patient/${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Users className="mr-2" />
                  Patient Records
                </h2>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
                    >
                      <Filter className="mr-2" size={18} />
                      Filter
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="mr-2" size={18} />
                      Refresh
                    </button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center py-10">Loading patients...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <th className="px-6 py-3">ID</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Address</th>
                          <th className="px-6 py-3">Sex</th>
                          <th className="px-6 py-3">EDC</th>
                          <th className="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedPatients.map((patient) => (
                          <tr key={patient.clientID} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">{patient.clientID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {patient.givenName} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{patient.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{patient.sex}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(patient.expectedDateConfinement).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleViewClick(patient.clientID)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredPatients.length)}</span>{" "}
                    of <span className="font-medium">{filteredPatients.length}</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 bg-white hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientRecords;