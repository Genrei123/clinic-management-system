import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Add"; // Import Modal

interface Visit {
  visitDate: string;
  reason: string;
}

interface Patient {
  id: string;
  name: string;
  birthdate: string;
  visitHistory: Visit[];
}

const Employee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patientImage, setPatientImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showTimeLog, setShowTimeLog] = useState<boolean>(false);
  const [showEmployeeTracker, setShowEmployeeTracker] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);

  const rowsPerPage = 5;

  const patient: Patient = {
    id: id || "",
    name: "Cristobal, Genrey O.",
    birthdate: "24/05/2024",
    visitHistory: [
      { visitDate: "2024-11-20", reason: "Routine Checkup" },
      { visitDate: "2024-11-15", reason: "Follow-Up" },
      { visitDate: "2024-11-10", reason: "Emergency Visit" },
      { visitDate: "2024-11-05", reason: "Vaccination" },
      { visitDate: "2024-10-30", reason: "Initial Consultation" },
      { visitDate: "2024-10-20", reason: "Routine Checkup" },
    ],
  };

  const totalPages = Math.ceil(patient.visitHistory.length / rowsPerPage);

  const paginatedVisits = patient.visitHistory.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setPatientImage(result);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleCheckInClick = () => {
    setShowTimeLog(true);
    setShowEmployeeTracker(false);
  };

  const handleEmployeeTrackerClick = () => {
    setShowEmployeeTracker(true);
    setShowTimeLog(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open modal when the user needs to submit credentials
  };

  const handleModalSubmit = (credentials: { username: string; password: string }) => {
    console.log("Submitted credentials:", credentials);
    setCredentials(credentials); // Store credentials or use for further logic
    setIsModalOpen(false); // Close modal after submission
  };

  const timeEntries = [
    {
      logIn: "24/05/2024 11:53AM",
      logOut: "24/05/2024 5:00PM",
    },
    {
      logIn: "24/05/2024 11:53AM",
      logOut: "24/05/2024 5:00PM",
    },
    {
      logIn: "24/05/2024 11:53AM",
      logOut: "24/05/2024 5:00PM",
    },
    {
      logIn: "24/05/2024 11:53AM",
      logOut: "24/05/2024 5:00PM",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-128 w-full">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-2xl font-bold">{patient.name}'s Employee Details</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Patient Image Upload Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-96 h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {patientImage ? (
                    <img src={patientImage} alt="Patient" className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-gray-500">No Image Uploaded</p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="patient-image-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="patient-image-upload"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Upload Image
                </label>
              </div>

              {/* Employee Tracker / Time Log Buttons */}
              <div className="space-y-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={handleEmployeeTrackerClick}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex-1 flex items-center gap-2"
                  >
                    Employee Check-ins
                  </button>
                  <button
                    onClick={handleCheckInClick}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex-1 flex items-center gap-2"
                  >
                    Employee Tracker
                  </button>
                </div>

                {/* Time Log / Employee Tracker Content */}
                {showTimeLog && (
                  <div className="mt-6">
                    <div className="rounded-md border">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="w-[200px] font-medium">Log-in</th>
                            <th className="w-[200px] font-medium">Log-out</th>
                          </tr>
                        </thead>
                        <tbody>
                          {timeEntries.map((entry, index) => (
                            <tr key={index}>
                              <td className="font-mono">{entry.logIn}</td>
                              <td className="font-mono">{entry.logOut}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {showEmployeeTracker && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Employee Tracker</h3>
                    {/* Example table for employee tracking */}
                    <div className="rounded-md border">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="w-[150px] font-medium">Date of Edit</th>
                            <th className="w-[150px] font-medium">File Record</th>
                            <th className="w-[200px] font-medium">Patient</th>
                            <th className="w-[100px] font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4].map((_, index) => (
                            <tr key={index}>
                              <td>24/05/2024</td>
                              <td>Record 1</td>
                              <td>Genrey O. Cristobal</td>
                              <td>
                                <button className="text-blue-500 hover:text-blue-700">View</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Trigger Modal Button */}
              <div className="mt-6">
                <button
                  onClick={handleOpenModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Open Credentials Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Employee;
