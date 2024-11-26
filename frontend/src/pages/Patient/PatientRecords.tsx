import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const PatientRecords: React.FC = () => {
  // Initial patient data
  const initialPatients = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Software Engineer",
      department: "Development",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Project Manager",
      department: "Management",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Carol Williams",
      position: "Designer",
      department: "Design",
      status: "Active",
    },
    {
      id: 4,
      name: "David Brown",
      position: "QA Engineer",
      department: "Quality Assurance",
      status: "Active",
    },
  ];

  const [patients] = useState(initialPatients);
  const navigate = useNavigate();

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
                {patients.map((patient) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
