import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

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
    <div className="flex">
      <Sidebar />

      <div className="ml-128 w-full">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-2xl font-bold">
                {patient.name}'s Medical Profile
              </h2>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {patientImage ? (
                    <img
                      src={patientImage}
                      alt="Patient"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-500">No Image Uploaded</p>
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Upload Image
                </label>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Birthdate:</strong> {patient.birthdate}
                  </p>
                  <p>
                    <strong>Patient ID:</strong> {patient.id}
                  </p>
                </div>

                <div className="space-y-4">
                  <select
                    onChange={(e) => setSelectedForm(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Claim Form</option>
                    <option value="CSF">CSF</option>
                    <option value="Claim Form 1">Claim Form 1</option>
                    <option value="Claim Form 2">Claim Form 2</option>
                  </select>
                  <button
                    onClick={handleGeneratePDF}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Generate PDF
                  </button>

                  <button
                    onClick={uploadOtherFiles}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Upload Other Files
                  </button>

                  <button
                    onClick={logAttendance}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Log Attendance
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t">
              <h3 className="text-xl font-semibold mb-4">Visit History</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Visit Date</th>
                    <th className="border p-2">Reason</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.visitHistory.map((visit, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{visit.visitDate}</td>
                      <td className="border p-2">{visit.reason}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() =>
                            navigate(`/patients/${patient.id}/visits/${index}`)
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                          View Details
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
    </div>
  );
};

export default Patient;
