import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../config/axiosConfig";
import { CheckCircle, XCircle } from "lucide-react";

interface Branch {
  branchID: number;
  branch_name: string;
  branch_address: string;
  branch_contact: string;
}

interface ClockIn {
  id: number;
  employeeId: string;
  branchId: number;
  timestamp: string; // ISO string
}

const EmployeeClockIn: React.FC = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | "">("");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clockIns, setClockIns] = useState<ClockIn[]>([]);
  const [loadingClockIns, setLoadingClockIns] = useState<boolean>(true);

  // Fetch branches, employee name, and clock-ins
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the employee name from the JWT token
        const storedToken = localStorage.getItem("username");
        if (!storedToken) {
          throw new Error("Token not found in localStorage");
        }
        setEmployeeName(storedToken);

        // Fetch branches from backend
        const branchResponse = await axiosInstance.get("/branches"); // Replace with your actual endpoint
        setBranches(branchResponse.data);

        // Fetch clock-ins from backend
        const clockInResponse = await axiosInstance.get("/clock-in");
        setClockIns(clockInResponse.data); // Set clock-in records in state
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoadingClockIns(false);
      }
    };

    fetchData();
  }, []);

  const handleClockIn = async () => {
    if (selectedBranch === "") {
      setError("Please select a branch to clock in.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Post clock-in data to backend
      const response = await axiosInstance.post("/clock-in", {
        branchId: selectedBranch,
        employeeId: employeeName, // Send employee name from JWT
      });

      if (response.status === 200) {
        setSuccess(true);

        // Add the new clock-in to the clockIns state
        setClockIns((prev) => [
          ...prev,
          {
            id: response.data.id,
            employeeId: employeeName,
            branchId: selectedBranch as number,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        setSuccess(false);
        setError("Failed to clock in. Please try again.");
      }
    } catch (err) {
      console.error("Clock In Error:", err);
      setSuccess(false);
      setError("An error occurred while clocking in.");
    } finally {
      setLoading(false);
    }
  };

  const renderClockInTable = () => (
    <div className="bg-white shadow-lg rounded-lg mt-6 p-4">
      <h2 className="text-xl font-bold mb-4">Clock-In Records</h2>
      {loadingClockIns ? (
        <p className="text-gray-600">Loading clock-in records...</p>
      ) : clockIns.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Employee Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody>
            {clockIns.map((clockIn) => (
              <tr key={clockIn.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{clockIn.employeeName}</td>
                <td className="py-3 px-4">
                  {
                    branches.find((branch) => branch.branchID === clockIn.branchId)
                      ?.branch_name || "Unknown Branch"
                  }
                </td>
                <td className="py-3 px-4">
                  {new Date(clockIn.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No clock-in records found.</p>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Employee Clock In</h2>
              <p className="mb-4 text-gray-700">
                Welcome, <span className="font-semibold">{employeeName}</span>!
              </p>

              {/* Clock In Form */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="branch"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Branch:
                  </label>
                  <select
                    id="branch"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Select a Branch --</option>
                    {branches.map((branch) => (
                      <option key={branch.branchID} value={branch.branchID}>
                        {branch.branch_name} - {branch.branch_address}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleClockIn}
                  disabled={loading}
                  className={`w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Clocking In..." : "Clock In"}
                </button>

                {/* Success Message */}
                {success && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Successfully clocked in!</span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Render Clock-In Table */}
            {renderClockInTable()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeClockIn;