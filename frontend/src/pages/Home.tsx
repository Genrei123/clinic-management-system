import React from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1>Home Content</h1>
                <p>This is the main content area on the right.</p>
                <button onClick={() => navigate('/inventory')} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Go to Inventory
                </button>
            </div>
        </div>
    );
};

export default Home;
