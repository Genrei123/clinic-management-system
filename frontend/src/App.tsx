import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Employee from "./pages/Employee/Employee";
import Report from "./pages/Report/Report";
import Patient from "./pages/Patient/Patient";
import AccountDetails from "./pages/AccountDetails";
import AccountSecurity from "./pages/AccountSecurity";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/account/details" element={<AccountDetails />} />
        <Route path="/account/security" element={<AccountSecurity />} />
      </Routes>
    </Router>
  );
};

export default App;
