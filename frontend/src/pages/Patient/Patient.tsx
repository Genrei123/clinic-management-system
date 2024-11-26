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

  // Mocked patient data (in real app, this would come from an API)
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

  const generateClaimForm = useCallback(
    (formType: string) => {
      // In a real application, this would trigger actual form generation
      console.log(`Generating ${formType} claim form for ${patient.name}`);
    },
    [patient.name]
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-128 w-full">
        {/* Navbar */}
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-2xl font-bold">
                {patient.name}'s Medical Profile
              </h2>
            </div>

            {/* Content Container */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Patient Image Section */}
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

              {/* Patient Details and Actions */}
              <div className="space-y-6">
                {/* Patient Basic Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Birthdate:</strong> {patient.birthdate}
                  </p>
                  <p>
                    <strong>Patient ID:</strong> {patient.id}
                  </p>
                </div>

                {/* Claim Form Generation */}
                <div className="space-y-4">
                  <select
                    onChange={(e) => generateClaimForm(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Claim Form</option>
                    <option value="Insurance">Insurance Claim</option>
                    <option value="Medical Certificate">
                      Medical Certificate
                    </option>
                    <option value="Reimbursement">Reimbursement Form</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visit History */}
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
