import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/Home";
import Inventory from "./pages/Inventory";
import Employee from "./pages/Employee";
import BannedUsers from "./pages/BannedUsers";
import Calendar from "./pages/Calendar";
import Report from "./pages/Report";
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
        <Route path="/patients/banned-users" element={<BannedUsers />} />
        <Route path="/patients/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/account/details" element={<AccountDetails />} />
        <Route path="/account/security" element={<AccountSecurity />} />
      </Routes>
    </Router>
  );
};

export default App;
