import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import Sidebar from "../components/Sidebar";
import { updateUser } from "../services/UserService";

const AccountSecurity: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await updateUser(formData.username, {
        password: formData.newPassword,
      });
      setMessage("Account updated successfully.");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Account Security</h1>
        <p>Manage your account username and password.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {message && (
            <div className="p-4 bg-green-100 text-green-800 rounded-md">
              {message}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSecurity;
