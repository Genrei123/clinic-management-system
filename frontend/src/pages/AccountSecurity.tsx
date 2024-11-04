// AccountSecurity.tsx
import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

const AccountSecurity: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-4">Account Security</h1>
                <p>This page allows the user to manage account security settings.</p>

                {/* Add form or security related components here */}
                <form className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Change Password</label>
                        <input type="password" placeholder="New Password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" placeholder="Confirm New Password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountSecurity;
