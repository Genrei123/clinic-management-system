import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const PatientRecords: React.FC = () => {
  // Initial patient data
  const initialPatients = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Patient ${index + 1}`,
    position: `Position ${index + 1}`,
    department: `Department ${Math.ceil((index + 1) / 10)}`,
    status: index % 2 === 0 ? "Active" : "Inactive",
  }));

  const [patients] = useState(initialPatients);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Pagination logic
  const totalPages = Math.ceil(patients.length / rowsPerPage);
  const paginatedPatients = patients.slice(
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        <Navbar />

        <div className="p-6">
          <div className="bg-white rounded shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Patient Records
            </h2>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Position
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Department
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.position}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.department}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleViewClick(patient.id)}
                        className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 text-white bg-gray-500 rounded hover:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 text-white bg-gray-500 rounded hover:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
