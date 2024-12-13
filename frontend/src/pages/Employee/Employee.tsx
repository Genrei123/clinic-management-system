import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ArchiveEmployee from "./archive-employee";
import {
  Camera,
  Upload,
  UserCheck,
  Calendar,
  Clock,
  Plus,
  Edit,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";


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
interface JwtPayload {
  sub: string; // User ID
  role: string; // User role
}

const Employee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employeeImage, setEmployeeImage] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showTimeLog, setShowTimeLog] = useState<boolean>(false);
  const [showEmployeeTracker, setShowEmployeeTracker] =
    useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const token = localStorage.getItem("token"); // Get the token from local storage
  let decoded: JwtPayload | null = null;

  if (token) {
    decoded = jwtDecode<JwtPayload>(token); // Decode the JWT token
  }

  const isOwner = decoded?.role === "ROLE_OWNER"; // Check if the user is an admin

  const fetchEmployee = async (token: string) => {
    try {
      if (decoded?.role === "ROLE_OWNER" || decoded?.role === "ROLE_EMPLOYEE") {
        const response = await axios.get(`/employees/${decoded.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployee(response.data);

        if (decoded.role === "ROLE_OWNER") {
          console.log("Role: OWNER - Display admin-specific data or actions.");
        } else if (decoded.role === "ROLE_EMPLOYEE") {
          console.log("Role: EMPLOYEE - Display employee-specific data or actions.");
        }
      } else {
        setError("You do not have the necessary permissions to view this data.");
        console.error("Invalid role:", decoded?.role);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data);
        setError(`Error: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        console.error("Unexpected Error:", error);
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }
  
    fetchEmployee(token); // Ensure `token` is used consistently
  }, [id]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          await axios.post(`/employees/${id}/upload-image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          fetchEmployee(localStorage.getItem("token") || "");
          setEmployeeImage(URL.createObjectURL(file));
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    [id]
  );

  const handleUpdateEmployee = async (updatedData: Employee) => {
    try {
      const updatedEmployee = {
        ...updatedData,
        id: employee?.id,
        visitHistory: employee?.visitHistory || [],
      };
      await axios.put(`/employees/${id}`, updatedEmployee);
      fetchEmployee(localStorage.getItem("token") || "");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    const updatedData: Employee = {
      id: employee.id,
      name: (e.target as HTMLFormElement)["first-name"].value,
      birthdate: `${(e.target as HTMLFormElement)["birth-year"].value}-${
        (e.target as HTMLFormElement)["birth-month"].value
      }-${(e.target as HTMLFormElement)["birth-day"].value}`,
      visitHistory: employee.visitHistory || [],
    };

    handleUpdateEmployee(updatedData);
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  

  return (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <h2 className="text-3xl font-bold">
                {employee?.name || "Unknown Employee"}'s Profile
              </h2>
              <p className="mt-2 text-blue-100">
                Employee ID: {employee?.id}
              </p>

              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="flex items-center text-gray-700">
                  <span className="font-semibold mr-2">Birthdate:</span>{" "}
                  {employee?.birthdate}
                </p>
              </div>
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
                    <span className="font-semibold mr-2">
                      Employee ID:
                    </span>{" "}
                    {employee?.id}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-semibold mr-2">
                      Birthdate:
                    </span>{" "}
                    {employee?.birthdate}
                  </p>
                </div>
              </div>
</div>
              <div className="space-y-6">
  <div className="bg-gray-50 p-4 rounded-lg shadow">
    <div className="flex space-x-2 mt-4">
      
      <button
        onClick={handleCheckInClick}
        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
      >
        <Clock className="w-5 h-5 mr-2" />
        Employee Check-ins
      </button>
    </div>

    {/* Conditionally render buttons based on the state */}
    {isOwner && ( // Only render these buttons if the user is the owner/admin
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
    <button
        onClick={handleEmployeeTrackerClick}
        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
      >
        <UserCheck className="w-5 h-5 mr-2" />
        Employee Tracker
      </button>
    <ArchiveEmployee
      employeeId={id || ""}
      employeeName={employee!.name}
    />
  </div>
)}

  </div>
</div>

              

            <div className="p-6 border-t border-gray-200">
              {showEmployeeTracker && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Employee Tracker
                  </h3>
                  <div className="rounded-md border">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="w-[150px] font-medium">
                            Date of Edit
                          </th>
                          <th className="w-[150px] font-medium">
                            File Record
                          </th>
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
                  <h3 className="text-xl font-semibold mb-4">
                    Employee Check-ins
                  </h3>
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
  
);

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isEditing ? "Edit Employee Account" : "Create Employee Account"}
            </h2>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData: Employee = {
                  name:
                    (e.target as HTMLFormElement)["first-name"].value +
                    " " +
                    (e.target as HTMLFormElement)["last-name"].value,
                  birthdate: `${
                    (e.target as HTMLFormElement)["birth-year"].value
                  }-${(e.target as HTMLFormElement)["birth-month"].value}-${
                    (e.target as HTMLFormElement)["birth-day"].value
                  }`,
                  id: employee?.id || "", // Ensure id is passed
                  visitHistory: employee?.visitHistory || [], // Empty array if no visitHistory
                };
                handleUpdateEmployee(updatedData);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="border-2 rounded-md p-2"
                    defaultValue={employee?.name || ""} // Fallback to an empty string if employee is not loaded
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="border-2 rounded-md p-2"
                    defaultValue={employee?.name}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-2 rounded-md p-2"
                  defaultValue={employee?.name}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="birth-year" className="text-sm font-medium">
                  Birth Year
                </label>
                <input
                  type="text"
                  id="birth-year"
                  className="border-2 rounded-md p-2"
                  defaultValue={employee?.birthdate?.split("-")[0]}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="birth-month" className="text-sm font-medium">
                  Birth Month
                </label>
                <input
                  type="text"
                  id="birth-month"
                  className="border-2 rounded-md p-2"
                  defaultValue={employee?.birthdate?.split("-")[1]}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="birth-day" className="text-sm font-medium">
                  Birth Day
                </label>
                <input
                  type="text"
                  id="birth-day"
                  className="border-2 rounded-md p-2"
                  defaultValue={employee?.birthdate?.split("-")[2]}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Save
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
