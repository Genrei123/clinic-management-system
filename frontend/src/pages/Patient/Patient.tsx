import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Camera, Upload, FileText, UserCheck, Calendar, Clock, ChevronRight } from 'lucide-react';

interface Visit {
  visitDate: string;
  reason: string;
}

interface Patient {
  id: string;
  name: string;
  birthdate: string;
  visitHistory: Visit[];
}

const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patientImage, setPatientImage] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<string>("");

  const patient: Patient = {
    id: id || "",
    name: "Cristobal, Genrey O.",
    birthdate: "24/05/2024",
    visitHistory: [
      { visitDate: "2024-11-20", reason: "Routine Checkup" },
      { visitDate: "2024-11-15", reason: "Follow-Up" },
    ],
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setPatientImage(result);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const generateClaimForm = useCallback(() => {
    if (selectedForm) {
      console.log(`Generating ${selectedForm} for ${patient.name}`);
      alert(`PDF for ${selectedForm} will be generated.`);
    } else {
      alert("Please select a form to generate.");
    }
  }, [selectedForm, patient.name]);

  const uploadOtherFiles = useCallback(() => {
    console.log("Uploading other files to Google Drive (placeholder).");
    alert("File uploaded to Google Drive (placeholder).");
  }, []);

  const logAttendance = useCallback(() => {
    console.log(`Logging attendance for ${patient.name}`);
    alert(`Attendance logged for ${patient.name}`);
  }, [patient.name]);

  const handleGeneratePDF = useCallback(() => {
    if (!selectedForm) {
      alert("Please select a form to generate.");
      return;
    }
    navigate(`/generate-pdf?form=${selectedForm}&patientId=${patient.id}`);
  }, [selectedForm, navigate, patient.id]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-3xl font-bold">{patient.name}'s Medical Profile</h2>
                <p className="mt-2 text-blue-100">Patient ID: {patient.id}</p>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {patientImage ? (
                        <img
                          src={patientImage}
                          alt="Patient"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      id="patient-image-upload"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="patient-image-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    >
                      <Upload className="w-8 h-8 mr-2" />
                      Upload Image
                    </label>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="flex items-center text-gray-700 mb-2">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-semibold mr-2">Birthdate:</span> {patient.birthdate}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <UserCheck className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-semibold mr-2">Patient ID:</span> {patient.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Actions</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="claim-form" className="block text-sm font-medium text-gray-700 mb-1">
                          Select Claim Form
                        </label>
                        <select
                          id="claim-form"
                          onChange={(e) => setSelectedForm(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Claim Form</option>
                          <option value="CSF">CSF</option>
                          <option value="Claim Form 1">Claim Form 1</option>
                          <option value="Claim Form 2">Claim Form 2</option>
                        </select>
                      </div>
                      <button
                        onClick={handleGeneratePDF}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Generate PDF
                      </button>
                      <button
                        onClick={uploadOtherFiles}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Other Files
                      </button>
                      <button
                        onClick={logAttendance}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
                      >
                        <UserCheck className="w-5 h-5 mr-2" />
                        Log Attendance
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Visit History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-2 text-left">Visit Date</th>
                        <th className="border border-gray-200 p-2 text-left">Reason</th>
                        <th className="border border-gray-200 p-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.visitHistory.map((visit, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-2">
                            <div className="flex items-center">
                              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                              {visit.visitDate}
                            </div>
                          </td>
                          <td className="border border-gray-200 p-2">
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-gray-500" />
                              {visit.reason}
                            </div>
                          </td>
                          <td className="border border-gray-200 p-2 text-center">
                            <button
                              onClick={() => navigate(`/patients/${patient.id}/visits/${index}`)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md transition duration-200 ease-in-out inline-flex items-center"
                            >
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Patient;

