import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ArchiveEmployee from './archive-employee';
import { Camera, Upload, UserCheck, Calendar, Clock, Plus, Edit } from 'lucide-react';
import axiosInstance from "../../config/axiosConfig";  // Assuming axios is configured for backend communication

interface Employee {
  id: number;
  employeeID: number;
  username: string;
  role: string;
  birthdate?: string;
  loginTimeStamp?: string;
  password: string;
}

const Employee: React.FC = () => {
  const [employeeImage, setEmployeeImage] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employeeID, setEmployeeID] = useState<number>(0);  // Assuming the employeeID is passed via URL or state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showTimeLog, setShowTimeLog] = useState<boolean>(false);
  const [showEmployeeTracker, setShowEmployeeTracker] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Employee> | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployee = async () => {
    try {
      const response = await axiosInstance.get(`/employee/${employeeID}`);
      setEmployee(response.data);
    } catch (error) {
      setError("Error fetching employee data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeID) {
      fetchEmployee();
    } else {
      setError("Invalid employee ID");
      setLoading(false);
    }
  }, [employeeID]);

  useEffect(() => {
    if (employee) {
      const [first, last] = employee.username?.split(' ') || ['', ''];
      setFirstName(first);
      setLastName(last);
    }
  }, [employee]);

  // Fetch employee list for the table
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees");
        setEmployees(response.data);
        console.log("Employees:", response);
      } catch (error) {
        console.error("Error fetching employee list", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          await axiosInstance.post(`/employees/${employeeID}/upload-image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          fetchEmployee();
          setEmployeeImage(URL.createObjectURL(file));
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Error uploading image");
        }
      }
    },
    [employeeID]
  );

  const handleUpdateEmployee = async (updatedData: Employee) => {
    try {
      await axiosInstance.put(`/updateEmployee/${employeeID}`, updatedData);
      fetchEmployee();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (employeeId: number) => {
    try {
      await axiosInstance.delete(`/deleteEmployee/${employeeID}`);
      alert("Employee deleted successfully");
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));  // Remove deleted employee from the list
    } catch (error) {
      console.error("Error deleting employee", error);
      alert("Error deleting employee");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) {
      alert("No data provided");
      return;
    }

    const updatedData: Employee = {
      ...formData,
      employeeID: employee?.id ?? 0,  // employee?.id will fall back to 0 if undefined
      username: `${firstName} ${lastName}`,
      id: employee?.id ?? 0,  // Make sure 'id' is always a number
    };
    

    handleUpdateEmployee(updatedData);
    setShowPopup(false);
  };

  const handleImageClickAdd = () => {
    setIsEditing(false);
    setFormData({});  // Clear formData for adding a new employee
    setShowPopup(true);
  };

  const handleImageClickEdit = () => {
    setIsEditing(true);
    setFormData(employee);  // Populate formData with existing employee data
    setShowPopup(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
          <button
            className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleImageClickAdd}
          >
            Add Employee
          </button>
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden mb-8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Birthdate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.username}</td>
                  <td>{emp.birthdate}</td>
                  <td>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => setEmployeeID(emp.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="container mx-auto px-6 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-3xl font-bold">{employee?.username || "Unknown Employee"}'s Profile</h2>
                <p className="mt-2 text-blue-100">Employee ID: {employee?.id}</p>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="flex items-center text-gray-700">
                    <span className="font-semibold mr-2">Birthdate:</span> {employee?.birthdate}
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
                </div>
              </div>

              {/* The Popup for Add/Edit Employee */}
              {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">
                      {isEditing ? "Edit Employee" : "Add Employee"}
                    </h2>
                    <form
                      className="space-y-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                          <input
                            type="text"
                            id="first-name"
                            className="border-2 rounded-md p-2"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                          <input
                            type="text"
                            id="last-name"
                            className="border-2 rounded-md p-2"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="birthdate" className="text-sm font-medium">Birthdate</label>
                        <input
                          type="date"
                          id="birthdate"
                          className="border-2 rounded-md p-2"
                          value={formData?.birthdate || ''}
                          onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowPopup(false)}
                          className="bg-gray-500 text-white py-2 px-6 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-6 rounded-md"
                        >
                          {isEditing ? "Save Changes" : "Add Employee"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employee;
