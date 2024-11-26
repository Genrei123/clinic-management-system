import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Patient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patientImage, setPatientImage] = useState(null);

  const patient = {
    id: id,
    name: "Cristobal, Genrey O.",
    birthdate: "24/05/2024",
    visitHistory: [
      { visitDate: "2024-11-20", reason: "Routine Checkup" },
      { visitDate: "2024-11-15", reason: "Follow-Up" },
    ],
  };

  const generateClaimForm = (formType: "Insurance" | "Medical Certificate" | "Reimbursement") => {
    alert(`Generating ${formType} claim form for ${patient.name}...`);
    // Add logic to handle claim form generation and editing (e.g., PDF customization).
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 flex-grow p-6 bg-gray-100 min-h-screen">
        <div className="content-container bg-white p-6 rounded-md shadow-lg w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            {patient.name}'s Records
          </h2>
          <div className="mb-6 flex justify-center">
            {patientImage ? (
              <img
                src={patientImage}
                alt="Patient"
                className="h-48 w-48 object-cover rounded-lg shadow"
              />
            ) : (
              <div className="h-48 w-48 bg-gray-200 flex items-center justify-center rounded-lg shadow">
                <p className="text-gray-500 font-medium">No Image</p>
              </div>
            )}
          </div>
          <div className="text-center mb-6">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setPatientImage(e.target.result as any);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload Image
            </label>
          </div>

          {/* Generate Claim Form Button */}
          <div className="text-center mb-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={() =>
                alert("Select a claim form type to generate for this patient.")
              }
            >
              Generate Claim Forms
            </button>
            <div className="inline-block relative">
              <select
                onChange={(e) => generateClaimForm(e.target.value as any)}
                className="block appearance-none bg-gray-200 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled selected>
                  Select Claim Type
                </option>
                <option value="Insurance">Insurance</option>
                <option value="Medical Certificate">Medical Certificate</option>
                <option value="Reimbursement">Reimbursement</option>
              </select>
            </div>
          </div>

          {/* Visit History */}
          <div className="visit-history">
            <h3 className="text-xl font-semibold mb-4">Visit History</h3>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Visit Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Reason
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {patient.visitHistory.map((visit, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {visit.visitDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {visit.reason}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          navigate(`/patients/${patient.id}/visits/${index}`)
                        }
                      >
                        View
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
  );
};

export default Patient;
