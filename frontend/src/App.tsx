import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Employee from "./pages/Employee/Employee";
import Report from "./pages/Report/Report";
import PatientRecords from "./pages/Patient/PatientRecords";
import Patient from "./pages/Patient/Patient";
import AccountDetails from "./pages/AccountDetails";
import AccountSecurity from "./pages/AccountSecurity";
import AccountBranch from "./pages/AccountBranch";
import LandingPage from "./pages/Landing Page/LandingPage";
import GeneratePDF from "./pages/Patient/GeneratedPDF";
import EmployeeDetails from "./pages/Employee/EmployeeDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          
          {/* Owner-only routes */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={["owner"]} element={<Inventory />} />
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["owner"]} element={<Report />} />
            }
          />

          {/* Shared routes */}
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["owner", "employee"]} element={<Employee />} />
            }
          />
          <Route
            path="/employee/:id"
            element={
              <ProtectedRoute allowedRoles={["owner", "employee"]} element={<EmployeeDetails />} />
            }
          />
          <Route
            path="/patientrecords"
            element={
              <ProtectedRoute allowedRoles={["owner", "employee"]} element={<PatientRecords />} />
            }
          />
          <Route
            path="/patient/:id"
            element={
              <ProtectedRoute allowedRoles={["owner", "employee"]} element={<Patient />} />
            }
          />
          <Route
            path="/generate-pdf"
            element={
              <ProtectedRoute allowedRoles={["owner", "employee"]} element={<GeneratePDF />} />
            }
          />
          <Route path="/account/details" element={<AccountDetails />} />
          <Route path="/account/security" element={<AccountSecurity />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
