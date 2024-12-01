import React, { useState } from "react";
import { Patient } from "../../types/Patient";
import { searchPatients, addPatient } from "../../services/patientService"; // Import your service
import { addPatientLog } from "../../services/visitService";
import SuccessAlert from "../../components/SuccessAlert";

interface PatientProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData ?: Patient;
    
}

const PatientProfileModal: React.FC<PatientProfileModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [step, setStep] = useState<"search" | "create" | "visit">("search");
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState<{ id: number; name: string }[]>([]);
    const [formData, setFormData] = useState<Patient>();
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
        null
    );
    const [visitPurpose, setVisitPurpose] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [patientName, setPatientName] = useState("");

    const handleSearch = async () => {
        try {
            const results = await searchPatients(searchTerm);
            setPatients(
                results.map((patient) => ({
                    id: patient.clientID,
                    name: patient.lastName,
                }))
            );
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData!, [name]: value });
    };

    const handleCreatePatient = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPatient = await addPatient(formData!);
            await addPatientLog(newPatient.clientID, visitPurpose); // Log visit immediately after creating
            // Tell staff that patient profile was created

            setPatientName(newPatient.lastName);
            setShowAlert(true);

            onClose();
        } catch (error) {
            console.error("Error creating patient:", error);
        }
    };

    const handleDismissAlert = () => {
        setShowAlert(false);
    };

    const handleVisitSubmit = async () => {
        if (selectedPatientId) {
            try {
                await addPatientLog(selectedPatientId, visitPurpose);
                onClose();
            } catch (error) {
                console.error("Error logging visit:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                {step !== "search" && (
                    <button
                        onClick={() => setStep("search")}
                        className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
                    >
                        &larr; Back
                    </button>
                )}
                {step === "search" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Search for Patient</h2>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border rounded-lg p-2 mb-4"
                        />
                        <button
                            onClick={handleSearch}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4"
                        >
                            Search
                        </button>

                        {patients.length > 0 ? (
                            <>
                                <h3 className="font-semibold mb-2">Select a Patient</h3>
                                {patients.map((patient) => (
                                    <button
                                        key={patient.id}
                                        className="w-full text-left p-2 border rounded-lg mb-2 hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedPatientId(patient.id);
                                            setStep("visit");
                                        }}
                                    >
                                        {patient.name}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setStep("create")}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg"
                                >
                                    Continue with New Patient
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setStep("create")}
                                className="w-full bg-green-600 text-white py-2 rounded-lg"
                            >
                                Continue with New Patient
                            </button>
                        )}
                        {showAlert && (
                            <SuccessAlert
                                patientName={patientName}
                                onDismiss={handleDismissAlert}
                            />
                        )}
                    </>
                )}

                {step === "visit" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Log Visit Purpose</h2>
                        <input
                            type="text"
                            placeholder="Enter purpose of visit"
                            value={visitPurpose}
                            onChange={(e) => setVisitPurpose(e.target.value)}
                            className="w-full border rounded-lg p-2 mb-4"
                        />
                        <button
                            onClick={handleVisitSubmit}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg"
                        >
                            Submit Visit
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full mt-4 bg-gray-300 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </>
                )}

                {step === "create" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">
                            Create New Patient Profile
                        </h2>
                        <form onSubmit={handleCreatePatient}>
                            <input
                                type="text"
                                name="varcharID"
                                placeholder="Varchar ID"
                                value={formData?.varcharID || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData?.lastName || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="givenName"
                                placeholder="Given Name"
                                value={formData?.givenName || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="middleInitial"
                                placeholder="Middle Initial"
                                value={formData?.middleInitial || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData?.age || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="gender"
                                placeholder="Gender"
                                value={formData?.sex || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData?.address || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                value={formData?.birthday || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="religion"
                                placeholder="Religion"
                                value={formData?.religion || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="occupation"
                                placeholder="Occupation"
                                value={formData?.occupation || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="lastDelivery"
                                placeholder="Last Delivery"
                                value={formData?.lastDelivery || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <input
                                type="text"
                                name="philhealthID"
                                placeholder="Philhealth ID"
                                value={formData?.philhealthID || ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 mb-4"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded-lg"
                            >
                                Submit Profile
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default PatientProfileModal;
