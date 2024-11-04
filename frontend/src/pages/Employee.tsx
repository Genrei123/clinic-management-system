import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './employee.css'; // Optional: You can create a separate CSS file for styling.

const Employee: React.FC = () => {
    const initialEmployees = [
        { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Development', status: 'Active' },
        { id: 2, name: 'Bob Smith', position: 'Project Manager', department: 'Management', status: 'Inactive' },
        { id: 3, name: 'Carol Williams', position: 'Designer', department: 'Design', status: 'Active' },
        { id: 4, name: 'David Brown', position: 'QA Engineer', department: 'Quality Assurance', status: 'Active' },
    ];

    const [employees] = useState(initialEmployees);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="employee-heading">Employee List</h1>

                {/* Employee Table */}
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>{employee.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
