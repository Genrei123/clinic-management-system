import React from 'react';
import { useNavigate } from 'react-router-dom';
 
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
    const navigate = useNavigate();

    // Optionally decode the JWT if necessary
    //const token = localStorage.getItem("token");
    //const decoded: any = jwtDecode(token!); // Adjust the type if you have a specific interface for the decoded token

    const handleGoToInventory = () => {
        navigate('/inventory');
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1>Home Content</h1>
                <p>This is the main content area on the right.</p>
                
                <button 
                    onClick={handleGoToInventory} 
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Go to Inventory
                </button>
            </div>
        </div>
    );
};

export default Home;
