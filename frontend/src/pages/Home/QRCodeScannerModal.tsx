import React from "react";
import Modal from "react-modal";
import { QrReader } from "react-qr-reader";


interface QRCodeScannerModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onScan: (data: string | null) => void;
}

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({
  isOpen,
  onRequestClose,
  onScan,
}) => {
  const handleScan = (data: string | null) => {
    if (data) {
      onScan(data);
      onRequestClose(); // Close modal after successful scan
    }
  };

  const handleError = (err: any) => {
    console.error("QR Code Scan Error:", err);
    // Optionally, display an error message to the user
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Scan QR Code"
      ariaHideApp={false} // Set to true in production and set app element
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "500px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <button
        onClick={onRequestClose}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cancel
      </button>
    </Modal>
  );
};

export default QRCodeScannerModal;
