import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Home, User, Package, Users, FileText, ChevronDown, LogOut, Settings, Menu, X } from 'lucide-react';
import logo from "../assets/logo.svg";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userRole } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const isActiveLink = (path: string) => location.pathname === path;

  const getLinkClassName = (path: string) => {
    const baseClasses =
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200";
    return isActiveLink(path)
      ? `${baseClasses} bg-blue-100 text-blue-700`
      : `${baseClasses} text-gray-700 hover:bg-gray-100 hover:text-blue-600`;
  };

  const navItems = [
    { path: "/home", label: "Home", icon: Home, roles: ["owner", "employee"] },
    { path: "/patientrecords", label: "Patient", icon: User, roles: ["owner", "employee"] },
    { path: "/inventory", label: "Inventory", icon: Package, roles: ["owner"] },
    { path: "/employees", label: "Employees", icon: Users, roles: ["owner", "employee"] },
    { path: "/reports", label: "Reports", icon: FileText, roles: ["owner"] },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`flex h-screen flex-col justify-between border-r bg-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="px-4 py-6 flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/home" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900">JIMIRENE</span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isCollapsed ? "ml-auto" : ""
          }`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 pb-4 space-y-1">
        {navItems
          .filter((item) => item.roles.includes(userRole as "owner" | "employee"))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${getLinkClassName(item.path)} ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="h-6 w-6 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}

        {/* Account Section */}
        {isCollapsed ? (
          <Link
            to="/account/details"
            className="flex justify-center text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg px-3 py-2 text-sm font-medium"
            title="Account"
          >
            <Settings className="h-6 w-6 flex-shrink-0" />
          </Link>
        ) : (
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
                isActiveLink("/account/details") || isActiveLink("/account/security")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 flex-shrink-0" />
                <span>Account</span>
              </div>
              <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
            </summary>
            <nav className="mt-1.5 ml-8 flex flex-col">
              <Link
                to="/account/details"
                className={getLinkClassName("/account/details")}
              >
                Details
              </Link>
              <Link
                to="/account/security"
                className={getLinkClassName("/account/security")}
              >
                Security
              </Link>
              <Link
                to="/account/branch"
                className={getLinkClassName("/account/branch")}
              >
                Branch
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
              >
                <LogOut className="h-6 w-6 flex-shrink-0" />
                Logout
              </button>
            </nav>
          </details>
        )}
      </nav>

      {/* Footer */}
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-4">
        <div
          className={`flex items-center gap-4 ${isCollapsed ? "justify-center" : ""}`}
        >
          <img
            alt="User avatar"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover"
          />
          {!isCollapsed && (
            <div className="flex-grow">
              <p className="text-sm">
                <strong className="block font-medium text-gray-900">
                  John Doe
                </strong>
                <span className="text-gray-600">john.doe@example.com</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

