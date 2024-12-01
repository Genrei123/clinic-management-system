import React, { useState } from "react";

const PatientDetailsModal: React.FC<{ onClose: () => void; patient?: any }> = ({ onClose, patient }) => {
  const [form, setForm] = useState({
    lastName: patient?.lastName || "",
    givenName: patient?.givenName || "",
    middleInitial: patient?.middleInitial || "",
    address: "",
    age: 0,
    birthday: "",
    religion: "",
    occupation: "",
    philhealthID: "",
  });

  const handleSubmit = () => {
    console.log("Submitting:", form);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{patient ? "Edit Patient" : "Create New Patient"}</h2>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={(form as any)[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full border p-2 rounded mb-2"
          />
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
          Save
        </button>
        <button className="text-red-500 underline mt-4" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
