import React from 'react';
import Sidebar from '../../components/Sidebar';

const Report: React.FC = () => {
    console.log("Report component rendered");

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-4">Reports</h1>
                <p>This page displays various reports and analytics.</p>
            </div>
        </div>
    );
};

export default Report;
