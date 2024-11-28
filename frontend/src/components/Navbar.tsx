import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
}

interface NavbarProps {
  hideSearch?: boolean; // Optional prop to hide search bar
}

const Navbar: React.FC<NavbarProps> = ({ hideSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  // Modal visibility states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sample patient data
  const patients: Patient[] = [
    { id: 1, name: "John Doe", gender: "Male", age: 30 },
    { id: 2, name: "Jane Smith", gender: "Female", age: 25 },
    { id: 3, name: "Alice Johnson", gender: "Female", age: 40 },
    { id: 4, name: "Bob Brown", gender: "Male", age: 50 },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPatients([]);
    } else {
      const results = patients.filter((patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPatients(results);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleCalendarModal = () => setIsCalendarOpen(!isCalendarOpen);
  const toggleSettingsModal = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleNotificationsModal = () =>
    setIsNotificationsOpen(!isNotificationsOpen);
  const toggleLogoutModal = () => setIsLogoutModalOpen(!isLogoutModalOpen);

  return (
    <div className="bg-gray-100 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo and Search Bar */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">Jimirene Clinic</div>
          {/* Conditionally render Search Bar based on hideSearch prop */}
          {!hideSearch && (
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Icons and Logout Button */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button
            className="p-2 text-gray-600 hover:text-blue-500"
            onClick={toggleNotificationsModal} // Toggle notifications modal visibility
          >
            <i className="fas fa-check-circle text-xl"></i>
            <a>Notification</a>
          </button>

          {/* Calendar Icon */}
          <button
            className="p-2 text-gray-600 hover:text-blue-500"
            onClick={toggleCalendarModal} // Toggle calendar modal visibility
          >
            <i className="fas fa-calendar-alt text-xl"></i>
            <a>Calendar</a>
          </button>

          {/* Gear Icon */}
          <button
            className="p-2 text-gray-600 hover:text-blue-500"
            onClick={toggleSettingsModal} // Toggle settings modal visibility
          >
            <i className="fas fa-cog text-xl"></i>
            <a>Settings</a>
          </button>

          {/* Logout Button */}
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={toggleLogoutModal}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Search Results Dropdown */}
      {filteredPatients.length > 0 && (
        <div className="absolute z-10 w-full max-w-md p-4 mt-2 bg-white border rounded-lg shadow-lg">
          <h3 className="mb-2 text-lg font-semibold">Search Results:</h3>
          <ul>
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                className="p-2 border-b last:border-none hover:bg-gray-100"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{patient.name}</span>
                  <span className="text-sm text-gray-500">
                    {patient.gender}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Age: {patient.age}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal Components */}
      {/* Modal implementations remain unchanged */}
    </div>
  );
};

export default Navbar;
