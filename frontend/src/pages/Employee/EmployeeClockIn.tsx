import { CheckCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../config/axiosConfig";

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

interface ClockOut {
  id: number;
  employeeId: string;
  branchId: number;
  timestamp: string; // ISO string
}

const EmployeeClockIn: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | "">("");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clockIns, setClockIns] = useState<ClockIn[]>([]);
  const [clockOuts, setClockOuts] = useState<ClockOut[]>([]);
  const [hasClockedIn, setHasClockedIn] = useState<boolean>(false);

  // Fetching data from the API and setting state on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("username");
        if (!storedToken) throw new Error("Token not found in localStorage");

        setEmployeeName(storedToken);

        // Fetch branch data from API
        const branchResponse = await axiosInstance.get("/branches");
        setBranches(branchResponse.data);

        // Fetch clock-in and clock-out data from the API
        const clockInResponse = await axiosInstance.get(`/clock-in`);
        const clockOutResponse = await axiosInstance.get(`/clock-out`);

        // Check if the user has already clocked in by looking at localStorage
        const clockedInStatus = localStorage.getItem("hasClockedIn");
        if (clockedInStatus === "true") {
          setHasClockedIn(true);
        }

        setClockIns(clockInResponse.data);
        localStorage.setItem("clockIns", JSON.stringify(clockInResponse.data));
  
        setClockOuts(clockOutResponse.data);
        localStorage.setItem("clockOuts", JSON.stringify(clockOutResponse.data));
  
  // Retrieve clock-in and clock-out data from localStorage, if any
  const storedClockIns = localStorage.getItem("clockIns");
  if (storedClockIns) {
    setClockIns(JSON.parse(storedClockIns));
  } else {
    setClockIns(clockInResponse.data);
  }

  const storedClockOuts = localStorage.getItem("clockOuts");
  if (storedClockOuts) {
    setClockOuts(JSON.parse(storedClockOuts));
  } else {
    setClockOuts(clockOutResponse.data);
  }


      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []); // Run once on component mount

  // Handle Clock-In
  const handleClockIn = async () => {
    if (selectedBranch === "") {
      setError("Please select a branch to clock in.");
      return;
    }

    const confirmClockIn = window.confirm("Are you sure you want to clock in?");
    if (!confirmClockIn) return;

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axiosInstance.post("/clock-in", {
        branchId: selectedBranch,
        employeeId: employeeName,
      });

      if (response.status === 200) {
        setHasClockedIn(true);
        localStorage.setItem("hasClockedIn", "true"); // Save clock-in status

        const newClockIn: ClockIn = {
          id: response.data.id,
          employeeId: employeeName,
          branchId: selectedBranch as number,
          timestamp: new Date().toISOString(),
        };

        setClockIns((prev) => {
          const updatedClockIns = [...prev, newClockIn];
          localStorage.setItem("clockIns", JSON.stringify(updatedClockIns)); // Persist data
          return updatedClockIns;
        });
      }
    } catch (err) {
      console.error("Error clocking in:", err);
      setError("An error occurred while clocking in.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Clock-Out
  const handleClockOut = async () => {
    if (selectedBranch === "") {
      setError("Please select a branch to clock out.");
      return;
    }

    const confirmClockOut = window.confirm("Are you sure you want to clock out?");
    if (!confirmClockOut) return;

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axiosInstance.post("/clock-out", {
        branchId: selectedBranch,
        employeeId: employeeName,
      });

      if (response.status === 200) {
        setHasClockedIn(false);
        localStorage.setItem("hasClockedIn", "false"); // Update clock-out status

        const newClockOut: ClockOut = {
          id: response.data.id,
          employeeId: employeeName,
          branchId: selectedBranch as number,
          timestamp: new Date().toISOString(),
        };

        setClockOuts((prev) => {
          const updatedClockOuts = [...prev, newClockOut];
          localStorage.setItem("clockOuts", JSON.stringify(updatedClockOuts)); // Persist data
          return updatedClockOuts;
        });
      }
    } catch (err) {
      console.error("Error clocking out:", err);
      setError("An error occurred while clocking out.");
    } finally {
      setLoading(false);
    }
  };

  // Render Clock-In History
  const renderClockInHistory = () => (
    <div className="bg-white shadow-lg rounded-lg mt-6 p-4">
      <h2 className="text-xl font-bold mb-4">Clock-In History</h2>
      {clockIns.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Employee Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Branch Address</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Clock-In Time</th>
            </tr>
          </thead>
          <tbody>
            {clockIns.map((clockIn) => {
              const branch = branches.find((branch) => branch.branchID === clockIn.branchId);
              return (
                <tr key={clockIn.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{clockIn.employeeId}</td>
                  <td className="py-3 px-4">{branch?.branch_name || "Unknown Branch"}</td>
                  <td className="py-3 px-4">{branch?.branch_address || "Unknown Address"}</td>
                  <td className="py-3 px-4">{new Date(clockIn.timestamp).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No clock-in records found.</p>
      )}
    </div>
  );

  // Render Clock-Out History
  const renderClockOutHistory = () => (
    <div className="bg-white shadow-lg rounded-lg mt-6 p-4">
      <h2 className="text-xl font-bold mb-4">Clock-Out History</h2>
      {clockOuts.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Employee Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Branch Address</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Clock-Out Time</th>
            </tr>
          </thead>
          <tbody>
            {clockOuts.map((clockOut) => {
              const branch = branches.find((branch) => branch.branchID === clockOut.branchId);
              return (
                <tr key={clockOut.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{clockOut.employeeId}</td>
                  <td className="py-3 px-4">{branch?.branch_name || "Unknown Branch"}</td>
                  <td className="py-3 px-4">{branch?.branch_address || "Unknown Address"}</td>
                  <td className="py-3 px-4">{new Date(clockOut.timestamp).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No clock-out records found.</p>
      )}
    </div>
  );

  let buttonText = "Clock In";
  if (loading) buttonText = "Clocking In..."; 
  else if (hasClockedIn) buttonText = "Already Clocked In";

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
                  disabled={loading || hasClockedIn}
                  className={`w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 ${
                    loading || hasClockedIn ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {buttonText}
                </button>

                {success && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Successfully clocked in!</span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>
                )}

                {hasClockedIn && (
                  <button
                    onClick={handleClockOut}
                    disabled={loading}
                    className={`w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Clocking Out..." : "Clock Out"}
                  </button>
                )}
              </div>
            </div>

            {/* Render Clock-In History */}
            {renderClockInHistory()}

            {/* Render Clock-Out History */}
            {renderClockOutHistory()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeClockIn;
