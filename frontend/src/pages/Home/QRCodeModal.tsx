import React from "react";

interface QRCodeModalProps {
  isOpen: boolean;
  qrCode: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, qrCode, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Patient QR Code
        </h2>
        <div className="text-center mb-6">
          <img src={qrCode} alt="Patient QR Code" className="w-48 h-48 mx-auto" />
          <p className="text-gray-600 mt-4">
            Scan this QR code to access the patient details.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
