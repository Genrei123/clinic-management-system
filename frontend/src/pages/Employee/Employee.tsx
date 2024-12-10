import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ArchiveEmployee from './archive-employee';
import { Camera, Upload, UserCheck, Calendar, Clock, Plus, Edit } from 'lucide-react';

interface Visit {
  visitDate: string;
  reason: string;
}

interface Employee {
  id: string;
  name: string;
  birthdate: string;
  visitHistory: Visit[];
}

const Employee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employeeImage, setEmployeeImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showTimeLog, setShowTimeLog] = useState<boolean>(false);
  const [showEmployeeTracker, setShowEmployeeTracker] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [employee, setEmployee] = useState<Employee>({
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
  });

  const rowsPerPage = 5;

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setEmployeeImage(result);
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

  const handleImageClickAdd = () => {
    setIsEditing(false);
    setShowPopup(true);
  };

  const handleImageClickEdit = () => {
    setIsEditing(true);
    setShowPopup(true);
  };

  const timeEntries = [
    {
      logIn: "24/05/2024 11:53AM",
      logOut: "24/05/2024 5:00PM",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-3xl font-bold">{employee.name}'s Profile</h2>
                <p className="mt-2 text-blue-100">Employee ID: {employee.id}</p>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {employeeImage ? (
                        <img
                          src={employeeImage}
                          alt="Employee"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      id="employee-image-upload"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="employee-image-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    >
                      <Upload className="w-8 h-8 mr-2" />
                      Upload Image
                    </label>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="flex items-center text-gray-700">
                      <UserCheck className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-semibold mr-2">Employee ID:</span> {employee.id}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-semibold mr-2">Birthdate:</span> {employee.birthdate}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={handleEmployeeTrackerClick}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <UserCheck className="w-5 h-5 mr-2" />
                        Employee Tracker
                      </button>
                      <button
                        onClick={handleCheckInClick}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <Clock className="w-5 h-5 mr-2" />
                        Employee Check-ins
                      </button>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleImageClickAdd}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Employee
                      </button>
                      <button
                        onClick={handleImageClickEdit}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <Edit className="w-5 h-5 mr-2" />
                        Edit Employee
                      </button>
                      <ArchiveEmployee employeeId={id || ''} employeeName={employee.name} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                {showEmployeeTracker && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Employee Tracker</h3>
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
                          {[1, 2, 3, 4].map((record, index) => (
                            <tr key={index}>
                              <td>24/05/2024</td>
                              <td>CSF</td>
                              <td>Genrey O. Cristobal</td>
                              <td>
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                  onClick={() => navigate(`/patient/${record}`)}
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
                )}

                {showTimeLog && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Employee Check-ins</h3>
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
              </div>
            </div>
          </div>
        </main>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isEditing ? "Edit Employee Account" : "Create Employee Account"}
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    className="border-2 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    className="border-2 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="border-2 rounded-md p-2"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border-2 rounded-md p-2"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="border-2 rounded-md p-2"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex flex-col w-1/3">
                  <label htmlFor="birth-day" className="text-sm font-medium">Day</label>
                  <select id="birth-day" className="border-2 rounded-md p-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-1/3">
                  <label htmlFor="birth-month" className="text-sm font-medium">Month</label>
                  <select id="birth-month" className="border-2 rounded-md p-2">
                    {[ 
                      "January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"
                    ].map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-1/3">
                  <label htmlFor="birth-year" className="text-sm font-medium">Year</label>
                  <select id="birth-year" className="border-2 rounded-md p-2">
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    className="h-5 w-5"
                  />
                  <label htmlFor="male" className="text-sm font-medium">Male</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    className="h-5 w-5"
                  />
                  <label htmlFor="female" className="text-sm font-medium">Female</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="prefer-not-to-say"
                    name="gender"
                    className="h-5 w-5"
                  />
                  <label htmlFor="prefer-not-to-say" className="text-sm font-medium">Prefer Not to Say</label>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditing ? "Save" : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;

