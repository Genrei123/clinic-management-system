// src/pages/EmployeeDetail/EmployeeDetail.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getEmployeeById } from "../../services/employeeService"; // You need to implement this
import { Employee } from "../../types/Employee";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await getEmployeeById(Number(id));
          setEmployee(data);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <p>Loading employee details...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <p>Employee not found.</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Employee ID:</strong> {employee.employeeID}
                </p>
                <p>
                  <strong>Username:</strong> {employee.username}
                </p>
                <p>
                  <strong>Email:</strong> {employee.email}
                </p>
                <p>
                  <strong>Role:</strong> {employee.role}
                </p>
              </div>
              <div>
                <p>
                  <strong>Last Login:</strong>{" "}
                  {employee.loginTimeStamp
                    ? new Date(employee.loginTimeStamp).toLocaleDateString()
                    : "Never"}
                </p>
                {/* Add more detailed fields as needed */}
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Back
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetails;
