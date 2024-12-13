import React, { useState, useEffect } from "react";
import Patient from "../../types/Patient";
import { addPatient } from "../../services/patientService";
import { addPatientLog } from "../../services/visitService";
import { AlertCircle, CheckCircle, X, Search, UserPlus } from "lucide-react";
import { createEmptyPatient } from "../../utils/Patient";
import ConfirmationModal from "./ConfirmationModal";

interface PatientProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: Patient;
}

const PatientProfileModal: React.FC<PatientProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<Patient>(createEmptyPatient());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitPurpose, setVisitPurpose] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const errors: { [key: string]: string } = {};
    const requiredFields: (keyof typeof formData)[] = [
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
      setErrorMessage(
        "Please check the following required fields: " +
          Object.keys(errors).map((field) => `\n- ${field}`)
      );
      return;
    }

    // Open confirmation modal
    setIsModalOpen(true);
  };

  const handleSubmitConfirmed = async () => {
    try {
      const newPatient = await addPatient(formData);

      console.log(newPatient);
      
      await addPatientLog(
        Number(newPatient),
        "Initial Check-up"
      );
      setSuccessMessage(
        `Patient profile for ${newPatient.lastName} was successfully created and visit logged.`
      );
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error creating patient:", error);
      setErrorMessage(
        "An error occurred while creating the patient profile. Please try again."
      );
    } finally {
      setIsModalOpen(false); // Close modal after submission
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [formData, visitPurpose]);

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
        <div className="w-full pl-6 overflow-y-auto items-center justify-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Create New Patient Profile
            </h2>
            <form
              onSubmit={handleCreatePatient}
              className="grid grid-cols-2 gap-4"
            >
              {/* Birthday input */}
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium">
                  Birthday
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday || ""}
                  onChange={(e) => {
                    handleInputChange(e); // Update the birthday field
                    const birthday = new Date(e.target.value);
                    const today = new Date();
                    const age = today.getFullYear() - birthday.getFullYear();
                    const isBirthdayPassed =
                      today.getMonth() > birthday.getMonth() ||
                      (today.getMonth() === birthday.getMonth() &&
                        today.getDate() >= birthday.getDate());
                    setFormData((prev) => ({
                      ...prev,
                      age: isBirthdayPassed ? age : age - 1, // Adjust age if the birthday hasn't occurred yet this year
                    }));
                  }}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              {[
                { label: "Patient ID", name: "patientID" },
                { label: "Last Name", name: "lastName" },
                { label: "Given Name", name: "givenName" },
                { label: "Middle Initial", name: "middleInitial" },
                { label: "Address", name: "address" },
                { label: "Religion", name: "religion" },
                { label: "Occupation", name: "occupation" },
                { label: "Age", name: "age", type: "number" },
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

              {/* Sex input */}
              <div>
                <label htmlFor="sex" className="block text-sm font-medium">
                  Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 bg-white"
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>

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
                "GRAVIDA",
                "PARA",
                "TERM",
                "PRE_TERM",
                "ABORTION",
                "LIVING",
              ].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium">
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

              {[
                { label: "LMP", name: "pregnancy.LMP", type: "date" },
                { label: "EDC", name: "pregnancy.EDC", type: "date" },
                { label: "IT_date", name: "pregnancy.IT_date", type: "date" },
                {
                  label: "Menarche",
                  name: "pregnancy.menarche",
                  type: "date",
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
                    value={
                      (formData.pregnancy as any)[name.split(".")[1]] || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              ))}

              <h3 className="col-span-2 font-bold mt-4">
                Consultation Details
              </h3>
              {[
                {
                  label: "Consultation Date",
                  name: "consultation.consultation_date",
                  type: "date",
                },
                { label: "AOG", name: "consultation.AOG", type: "number" },
                { label: "BP", name: "consultation.BP", type: "number" },
                {
                  label: "Weight",
                  name: "consultation.weight",
                  type: "number",
                },
                { label: "FH", name: "consultation.FH", type: "number" },
                { label: "FHT", name: "consultation.FHT", type: "number" },
                { label: "Remarks", name: "consultation.remarks" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={
                      (formData.consultation as any)[name.split(".")[1]] || ""
                    }
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              ))}

              <h3 className="col-span-2 font-bold mt-4">Medical History</h3>

              {[
                "smoking",
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
                    {field.toUpperCase()}
                  </label>
                  <input
                    id={field}
                    name={`medicalHistory.${field}`}
                    type="checkbox"
                    checked={(formData.medicalHistory as any)[field] || false}
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
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-medium mb-2"
                >
                  Allergies (Specify)
                </label>

                <input
                  id="allergies"
                  name="medicalHistory.allergies"
                  type="text"
                  value={(formData.medicalHistory as any)["allergies"] || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Write allergies here"
                />
              </div>
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-center">
                  <AlertCircle size={24} className="mr-3" />
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded flex items-center">
                  <CheckCircle size={24} className="mr-3" />
                  {successMessage}
                </div>
              )}

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

          {/* Use the Confirmation Modal */}
          <ConfirmationModal
            isOpen={isModalOpen}
            data={formData}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleSubmitConfirmed}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientProfileModal;
