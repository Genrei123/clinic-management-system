import React from 'react';
import Sidebar from '../components/Sidebar';

const Calendar: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-4">Calendar</h1>
                <p>This page displays the calendar view.</p>
            </div>
        </div>
    );
};

export default Calendar;
