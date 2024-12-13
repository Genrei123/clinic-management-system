import React, { useState } from "react";
import { X, Trash } from "lucide-react";

interface RenderService {
  serviceName: string;
  price: number;
  description: string;
}

interface SelectedMedicine extends RenderService {
  quantity: number;
}

interface RenderServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    id: string;
    name: string;
  };
}

// Mock Data
const mockServices = [
  { serviceName: "Blood Test", price: 50, description: "General blood analysis." },
  { serviceName: "X-Ray", price: 100, description: "Chest X-Ray imaging." },
  { serviceName: "ECG", price: 80, description: "Heart monitoring and analysis." },
];

const mockMedicines = [
  { serviceName: "Paracetamol", price: 10, description: "Pain relief." },
  { serviceName: "Antibiotic", price: 25, description: "Infection treatment." },
  { serviceName: "Vitamin C", price: 15, description: "Immune booster." },
];

const RenderServicesModal: React.FC<RenderServicesModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  const [selectedServices, setSelectedServices] = useState<RenderService[]>([]);
  const [selectedMedicines, setSelectedMedicines] = useState<SelectedMedicine[]>([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const [serviceSuggestions, setServiceSuggestions] = useState<RenderService[]>([]);
  const [medicineSuggestions, setMedicineSuggestions] = useState<RenderService[]>([]);

  // Simulate fetching suggestions
  const fetchServiceSuggestions = (query: string) => {
    const results = mockServices.filter((service) =>
      service.serviceName.toLowerCase().includes(query.toLowerCase())
    );
    setServiceSuggestions(results);
  };

  const fetchMedicineSuggestions = (query: string) => {
    const results = mockMedicines.filter((medicine) =>
      medicine.serviceName.toLowerCase().includes(query.toLowerCase())
    );
    setMedicineSuggestions(results);
  };

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setServiceSearch(query);
    if (query) {
      fetchServiceSuggestions(query);
    } else {
      setServiceSuggestions([]);
    }
  };

  const handleMedicineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setMedicineSearch(query);
    if (query) {
      fetchMedicineSuggestions(query);
    } else {
      setMedicineSuggestions([]);
    }
  };

  const handleServiceSuggestionClick = (service: RenderService) => {
    if (!selectedServices.some((s) => s.serviceName === service.serviceName)) {
      setSelectedServices((prev) => [...prev, service]);
    }
    setServiceSearch("");
    setServiceSuggestions([]);
  };

  const handleMedicineSuggestionClick = (medicine: RenderService) => {
    if (!selectedMedicines.some((m) => m.serviceName === medicine.serviceName)) {
      setSelectedMedicines((prev) => [
        ...prev,
        { ...medicine, quantity: 1 },
      ]);
    }
    setMedicineSearch("");
    setMedicineSuggestions([]);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedMedicines((prev) =>
      prev.map((medicine, i) =>
        i === index ? { ...medicine, quantity: Math.max(1, quantity) } : medicine
      )
    );
  };

  const handleRemoveItem = (index: number, type: "service" | "medicine") => {
    if (type === "service") {
      setSelectedServices((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSelectedMedicines((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    alert("Services rendered successfully!");
    setSelectedServices([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">
          Render Services for Patient: {patient.name}
        </h2>

        <div className="flex space-x-6">
          {/* Search and Add Items */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3">Search and Add Services</h3>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search for a service..."
                value={serviceSearch}
                onChange={handleServiceInputChange}
                className="w-full p-2 border rounded"
              />
              {serviceSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
                  {serviceSuggestions.map((service, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleServiceSuggestionClick(service)}
                    >
                      {service.serviceName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h3 className="text-lg font-bold mb-3">Search and Add Medicines</h3>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search for a medicine..."
                value={medicineSearch}
                onChange={handleMedicineInputChange}
                className="w-full p-2 border rounded"
              />
              {medicineSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
                  {medicineSuggestions.map((medicine, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMedicineSuggestionClick(medicine)}
                    >
                      {medicine.serviceName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Selected Items */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3">Selected Items</h3>
            <div className="overflow-y-auto h-64 border rounded p-2">
              <h4 className="font-semibold text-gray-800">Services:</h4>
              {selectedServices.length === 0 ? (
                <p className="text-gray-600">No services selected.</p>
              ) : (
                <ul className="mb-4">
                  {selectedServices.map((service, index) => (
                    <li
                      key={index}
                      className="border rounded-md p-4 shadow-sm flex items-center justify-between mb-2"
                    >
                      <div>
                        <h4 className="font-medium">{service.serviceName}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-sm text-gray-800 font-bold">
                          ${service.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(index, "service")}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        <Trash size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <h4 className="font-semibold text-gray-800">Medicines:</h4>
              {selectedMedicines.length === 0 ? (
                <p className="text-gray-600">No medicines selected.</p>
              ) : (
                <ul>
                  {selectedMedicines.map((medicine, index) => (
                    <li
                      key={index}
                      className="border rounded-md p-4 shadow-sm flex items-center justify-between mb-2"
                    >
                      <div>
                        <h4 className="font-medium">{medicine.serviceName}</h4>
                        <p className="text-sm text-gray-600">{medicine.description}</p>
                        <p className="text-sm text-gray-800 font-bold">
                          ${medicine.price}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <label className="text-sm font-semibold">Quantity:</label>
                          <input
                            type="number"
                            value={medicine.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                index,
                                parseInt(e.target.value, 10)
                              )
                            }
                            min={1}
                            className="w-16 p-1 border rounded"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(index, "medicine")}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        <Trash size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderServicesModal;
