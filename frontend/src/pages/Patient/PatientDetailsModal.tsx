import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

interface PatientDetailsModalProps {
  isOpen: boolean;
  data?: { [key: string]: any }; // Make `data` optional
  onClose: () => void;
  
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
  isOpen,
  data = {}, // Default to empty object
  onClose,
  }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [status, setStatus] = useState(data?.status || "active");

  useEffect(() => {
    if (isOpen && data) {
      setFormData(data);
      setStatus(data.status || "active");
      setExpandedSections([]);
    } else if (!isOpen) {
      setIsEditing(false);
      setExpandedSections([]);
    }
  }, [isOpen, data]);

  const handleUpdate = async () => {
    try {
      await axiosInstance.patch(`/updatePatient/${formData.clientID}`, formData);
      setIsEditing(false);
      alert("Patient details updated successfully.");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("An error occurred while updating patient details.");
    }
  };

  const handleArchive = async () => {
    try {
      await axiosInstance.patch(`/archivePatient/${data.clientID}`);
      setIsArchiveModalOpen(false);
      setStatus("archived");
      onClose();
      alert("Patient archived successfully.");
      navigate("/patientrecords");
    } catch (error) {
      console.error("Error archiving patient:", error);
      alert("An error occurred while archiving the patient.");
    }
  };

  const handleUnarchive = async () => {
    try {
      await axiosInstance.patch(`/unarchivePatient/${data.clientID}`);
      setIsArchiveModalOpen(false);
      setStatus("active");
      ;
      onClose();
      alert("Patient unarchived successfully.");
      navigate("/patientrecords");
    } catch (error) {
      console.error("Error unarchiving patient:", error);
      alert("An error occurred while unarchiving the patient.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Patient Details</h2>
        <div className="space-y-6 mb-8">
          <table className="w-full table-auto border-collapse">
            <tbody>
              {Object.entries(formData)
                .filter(([key]) => key !== "imagePath")
                .map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-3 pr-6 font-medium text-right align-top w-1/4">
                      {key}:
                    </td>
                    <td className="py-3 pl-6 text-left align-top">
                      {value?.toString() || "N/A"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end space-x-6 pt-6 border-t border-gray-200">
          <button
            className={`${
              status === "archived" ? "bg-green-500" : "bg-yellow-500"
            } text-white px-8 py-3 rounded-lg text-lg hover:${
              status === "archived" ? "bg-green-600" : "bg-yellow-600"
            } transition-colors duration-200`}
            onClick={() => setIsArchiveModalOpen(true)}
          >
            {status === "archived" ? "Unarchive" : "Archive"}
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg hover:bg-gray-300 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      {isArchiveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-800">
              Confirm {status === "archived" ? "Unarchive" : "Archive"}
            </h3>
            <p className="text-gray-600 my-4">
              Are you sure you want to {status === "archived" ? "unarchive" : "archive"} this patient?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => setIsArchiveModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`${
                  status === "archived" ? "bg-green-500" : "bg-yellow-500"
                } text-white px-4 py-2 rounded-lg hover:${
                  status === "archived" ? "bg-green-600" : "bg-yellow-600"
                }`}
                onClick={status === "archived" ? handleUnarchive : handleArchive}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsModal;
