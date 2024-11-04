import React from 'react';
import Sidebar from '../components/Sidebar';

const BannedUsers: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-4">Banned Users</h1>
                <p>This page lists all banned users.</p>
            </div>
        </div>
    );
};

export default BannedUsers;
