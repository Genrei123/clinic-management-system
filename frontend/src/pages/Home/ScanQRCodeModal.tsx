import React from "react";
import { QrReader } from "react-qr-reader";

interface ScanQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (result: string) => void;
}

const ScanQRCodeModal: React.FC<ScanQRCodeModalProps> = ({
  isOpen,
  onClose,
  onScanResult,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
            <div className="relative">
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold text-white drop-shadow-md">
                  Scan QR Code
                </h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* QR Reader Section */}
              <div className="relative aspect-square w-full">
                <QrReader
                  onResult={(result, error) => {
                    if (result) {
                      onScanResult(result.getText());
                    }
                  }}
                  constraints={{ facingMode: "environment" }}
                  className="w-full h-full"
                />
                {/* Visual Helper */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border-2 border-white rounded-lg"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-100">
              <p className="text-center text-gray-600">
                Position the QR code within the frame to scan
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScanQRCodeModal;