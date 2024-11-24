import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './Patient.css'; // Optional: You can create a separate CSS file for styling.

const Patient: React.FC = () => {
    const initialPatient = [
        { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Development', status: 'Active' },
        { id: 2, name: 'Bob Smith', position: 'Project Manager', department: 'Management', status: 'Inactive' },
        { id: 3, name: 'Carol Williams', position: 'Designer', department: 'Design', status: 'Active' },
        { id: 4, name: 'David Brown', position: 'QA Engineer', department: 'Quality Assurance', status: 'Active' },
    ];

    const [Patient] = useState(initialPatient);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <h1>Patient!</h1>
        </div>
    );
};

export default Patient;
