import React, { useState } from 'react';
import axiosInstance from '../config/axiosConfig'; // Your Axios instance configuration
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

const AccountBranch: React.FC = () => {
    const [branchData, setBranchData] = useState({
        branch_name: '',
        branch_address: '',
        branch_contact: '',
    });
    

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBranchData({
            ...branchData,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents default form submission behavior
        try {
            const response = await axiosInstance.post('/addBranch', branchData);
            console.log('Response from backend:', response); // Debug log
            setMessage('Branch created successfully!');
        } catch (error: any) {
            console.error('Error response:', error.response); // Debug log
            if (error.response) {
                setMessage(error.response.data?.message || 'An error occurred');
            } else {
                setMessage('Unable to connect to the server');
            }
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-4">Account Branch</h1>
                <p>This page displays the creation of clinic's branch.</p>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                        <input
                            type="text"
                            name="branch_name"
                            value={branchData.branch_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Branch Address</label>
                        <input
                            type="text"
                            name="branch_address"
                            value={branchData.branch_address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Branch Contact</label>
                        <input
                            type="text"
                            name="branch_contact"
                            value={branchData.branch_contact}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white"
                        >
                            Create Branch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountBranch;
