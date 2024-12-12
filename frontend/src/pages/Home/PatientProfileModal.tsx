import React, { useState, useEffect } from "react";
import Patient from "../../types/Patient";
import { searchPatients, addPatient } from "../../services/patientService";
import { addPatientLog } from "../../services/visitService";
import { AlertCircle, CheckCircle, X, Search, UserPlus } from 'lucide-react';
import { createEmptyPatient } from "../../utils/Patient";

interface PatientProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: Patient;
}

const PatientProfileModal: React.FC<PatientProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"search" | "create" | "visit">("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<
    { id: number; lastName: string; givenName: string }[]
  >([]);
  const [formData, setFormData] = useState<Patient>(createEmptyPatient());
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [visitPurpose, setVisitPurpose] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setErrorMessage("");
    setFieldErrors({});
  }, [searchTerm, formData, visitPurpose]);

  const handleSearch = async () => {
    try {
      const results = await searchPatients(searchTerm);
      setPatients(
        results.map((patient) => ({
          id: patient.clientID,
          lastName: patient.lastName,
          givenName: patient.givenName,
        }))
      );
      if (results.length === 0) {
        setErrorMessage(
          "No patients found. Please try a different search term or create a new patient."
        );
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      setErrorMessage(
        "An error occurred while searching for patients. Please try again."
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Patient],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    const requiredFields: (keyof Patient)[] = [
      "patientID",
      "lastName",
      "givenName",
      "age",
      "sex",
      "address",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const newPatient = await addPatient(formData);
      await addPatientLog(Number(newPatient), visitPurpose);
      setSuccessMessage(
        `Patient profile for ${newPatient.lastName} was successfully created and visit logged.`
      );
      setFieldErrors({});
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error creating patient:", error);
      setErrorMessage(
        "An error occurred while creating the patient profile. Please try again."
      );
    }
  };

  const handleVisitSubmit = async () => {
    if (selectedPatientId) {
      try {
        if (visitPurpose.trim() === "") {
          setVisitPurpose("Check-up");
        }
        await addPatientLog(selectedPatientId, visitPurpose);
        setSuccessMessage("Visit successfully logged.");
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 3000);
      } catch (error) {
        console.error("Error logging visit:", error);
        setErrorMessage(
          "An error occurred while logging the visit. Please try again."
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-7xl h-[90vh] relative flex">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
        >
          <X size={24} />
        </button>
        <div className="w-1/3 border-r pr-6 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Patient Search
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter patient name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-3 pr-10 mb-4 focus:border-blue-500 focus:outline-none transition duration-300"
            />
            <Search
              className="absolute right-3 top-3 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <Search size={20} className="mr-2" />
            Search
          </button>
          {patients.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-lg text-gray-700">
                Select a Patient
              </h3>
              {patients.map((patient) => (
                <button
                  key={patient.id}
                  className={`w-full text-left p-3 border-2 rounded-lg mb-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    selectedPatientId === patient.id
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100 border-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedPatientId(patient.id);
                    setStep("visit");
                  }}
                >
                  <span className="font-medium text-gray-800">
                    {patient.lastName}, {patient.givenName}
                  </span>
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setStep("create")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 mt-6 flex items-center justify-center"
          >
            <UserPlus size={20} className="mr-2" />
            Create New Patient
          </button>
        </div>
        <div className="w-2/3 pl-6 overflow-y-auto">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded flex items-center">
              <CheckCircle size={24} className="mr-3" />
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-center">
              <AlertCircle size={24} className="mr-3" />
              {errorMessage}
            </div>
          )}
          {step === "visit" && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Log Visit Purpose
              </h2>
              <textarea
                placeholder="Enter purpose of visit"
                value={visitPurpose}
                onChange={(e) => setVisitPurpose(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-blue-500 focus:outline-none transition duration-300 h-32 resize-none"
              />
              <button
                onClick={handleVisitSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit Visit
              </button>
            </div>
          )}
          {step === "create" && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Create New Patient Profile
              </h2>
              <form
                onSubmit={handleCreatePatient}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Patient ID", name: "patientID" },
                  { label: "Image Path", name: "imagePath" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Given Name", name: "givenName" },
                  { label: "Middle Initial", name: "middleInitial" },
                  { label: "Sex", name: "sex" },
                  { label: "Address", name: "address" },
                  { label: "Age", name: "age", type: "number" },
                  { label: "Birthday", name: "birthday", type: "date" },
                  { label: "Religion", name: "religion" },
                  { label: "Occupation", name: "occupation" },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-medium">
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={(formData as any)[name] || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                ))}

                <h3 className="col-span-2 font-bold mt-4">Spouse Details</h3>
                {[
                  { label: "Spouse Name", name: "spouse.spouseName" },
                  {
                    label: "Spouse Birthday",
                    name: "spouse.spouseBirthday",
                    type: "date",
                  },
                  { label: "Spouse Religion", name: "spouse.spouseReligion" },
                  {
                    label: "Spouse Occupation",
                    name: "spouse.spouseOccupation",
                  },
                  {
                    label: "Spouse Contact Number",
                    name: "spouse.spouseContactNumber",
                  },
                  {
                    label: "Spouse Age",
                    name: "spouse.spouseAge",
                    type: "number",
                  },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-medium">
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={(formData.spouse as any)[name.split(".")[1]] || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                ))}

                <h3 className="col-span-2 font-bold mt-4">Pregnancy Details</h3>
                {[
                  "gravida",
                  "para",
                  "term",
                  "preTerm",
                  "abortion",
                  "living",
                ].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium"
                    >
                      {field}
                    </label>
                    <input
                      id={field}
                      name={`pregnancy.${field}`}
                      type="number"
                      value={(formData.pregnancy as any)[field] || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                ))}

                <h3 className="col-span-2 font-bold mt-4">Medical History</h3>
                {[
                  "smoking",
                  "allergies",
                  "drugIntake",
                  "bleedingAnemia",
                  "previousCSection",
                  "consectuivemiscarriage",
                  "postPartumHemorrhage",
                  "forcepDelivery",
                  "hypertension",
                ].map((field) => (
                  <div key={field} className="mb-4">
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium mb-2"
                    >
                      {field === "allergies" ? "Allergies (Specify)" : field}
                    </label>
                    {field === "allergies" ? (
                      <input
                        id={field}
                        name={`medicalHistory.${field}`}
                        type="text"
                        value={(formData.medicalHistory as any)[field] || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        placeholder="Write allergies here"
                      />
                    ) : (
                      <input
                        id={field}
                        name={`medicalHistory.${field}`}
                        type="checkbox"
                        checked={
                          (formData.medicalHistory as any)[field] || false
                        }
                        onChange={(e) => {
                          const { name, checked } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            medicalHistory: {
                              ...prev.medicalHistory,
                              [field]: checked,
                            },
                          }));
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileModal;