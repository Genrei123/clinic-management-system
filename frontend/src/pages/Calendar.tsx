import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Calendar: React.FC = () => {
    const [patientId, setPatientId] = useState<number | ''>(''); // To store the input patient ID
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);  // To store the URL of the fetched PDF

    const handleGeneratePdf = async () => {
        if (!patientId) {
            alert("Please enter a valid Patient ID.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/generatepdf/${patientId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch PDF");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error("Error fetching the PDF:", error);
            alert("An error occurred while fetching the PDF.");
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>Generate Patient PDF</h1>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="number"
                        placeholder="Enter Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(Number(e.target.value) || '')}
                        style={inputStyle}
                    />
                    <button onClick={handleGeneratePdf} style={buttonStyle}>
                        Generate PDF
                    </button>
                </div>
                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="PDF Preview"
                        style={iframeStyle}
                    ></iframe>
                )}
            </div>
        </div>
    );
};

const inputStyle: React.CSSProperties = {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
};

const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

const iframeStyle: React.CSSProperties = {
    marginTop: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
};

export default Calendar;
