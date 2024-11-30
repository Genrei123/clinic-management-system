import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Calendar, Settings, LogOut, Search, X } from 'lucide-react';
import CalendarModal from "./modals/CalendarModal";
import SettingsModal from "./modals/SettingsModal";
import NotificationsModal from "./modals/NotificationsModal";
import LogoutModal from "./modals/LogoutModal";

interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
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
    <div className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        
        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Search Results Dropdown */}
          {filteredPatients.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Search Results:</h3>
                  <button 
                    onClick={() => setFilteredPatients([])} 
                    className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <li
                      key={patient.id}
                      className="py-3 flex justify-between items-center hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                    >
                      <div>
                        <span className="font-medium text-gray-800">{patient.name}</span>
                        <p className="text-sm text-gray-600">
                          {patient.gender}, Age: {patient.age}
                        </p>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">View</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <NavbarButton onClick={() => setIsNotificationsOpen(true)} icon={Bell} label="Notifications" />
          <NavbarButton onClick={() => setIsCalendarOpen(true)} icon={Calendar} label="Calendar" />
          <NavbarButton onClick={() => setIsSettingsOpen(true)} icon={Settings} label="Settings" />
          <NavbarButton onClick={() => setIsLogoutModalOpen(true)} icon={LogOut} label="Logout" />
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

interface NavbarButtonProps {
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label={label}
  >
    <Icon className="h-6 w-6" />
  </button>
);

export default Navbar;

