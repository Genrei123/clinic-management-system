import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendarAlt,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import CalendarModal from "./modals/CalendarModal";
import SettingsModal from "./modals/SettingsModal";
import NotificationsModal from "./modals/NotificationsModal";
import LogoutModal from "./modals/LogoutModal";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  interface Patient {
    id: number;
    name: string;
    gender: string;
    age: number;
  }

  // Sample patient data
  const patients: Patient[] = [
    { id: 1, name: "John Doe", gender: "Male", age: 30 },
    { id: 2, name: "Jane Smith", gender: "Female", age: 25 },
    { id: 3, name: "Alice Johnson", gender: "Female", age: 40 },
    { id: 4, name: "Bob Brown", gender: "Male", age: 50 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

  return (
    <div className="bg-gray-100 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="text-xl font-bold text-gray-800">Jimirene Clinic</div>
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

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
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsNotificationsOpen(true)}>
            <FontAwesomeIcon icon={faBell} size="lg" />
          </button>
          <button onClick={() => setIsCalendarOpen(true)}>
            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
          </button>
          <button onClick={() => setIsSettingsOpen(true)}>
            <FontAwesomeIcon icon={faCog} size="lg" />
          </button>
          <button onClick={() => setIsLogoutModalOpen(true)}>
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </button>
        </div>
      </nav>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;
