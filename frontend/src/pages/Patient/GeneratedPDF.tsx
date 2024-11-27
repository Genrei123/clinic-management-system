import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import CSF from "../../assets/pdf/CF2.pdf";
import ClaimForm1 from "../../assets/pdf/CF2.pdf";
import ClaimForm2 from "../../assets/pdf/CF2.pdf";

const GeneratePDF: React.FC = () => {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get("form");
  const patientId = searchParams.get("patientId");
  const [loading, setLoading] = useState(true);

  const getPDFFile = () => {
    switch (formType) {
      case "CSF":
        return CSF;
      case "Claim Form 1":
        return ClaimForm1;
      case "Claim Form 2":
        return ClaimForm2;
      default:
        return CSF;
    }
  };

  const handleIframeLoad = () => setLoading(false);

  const downloadFlattenedPDF = async () => {
    const pdfBytes = await fetch(getPDFFile()).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Flatten all form fields
    const form = pdfDoc.getForm();
    form.flatten();

    // Save the flattened PDF
    const flattenedBytes = await pdfDoc.save();
    const blob = new Blob([flattenedBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "flattened_form.pdf";
    link.click();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-128 w-full">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="relative bg-white shadow-lg rounded-lg p-6">
            <p className="mb-4 text-lg">
              <strong>Form:</strong> {formType}
            </p>
            <p className="mb-4 text-lg">
              <strong>Patient ID:</strong> {patientId}
            </p>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            )}

            <iframe
              src={getPDFFile()}
              title="PDF Viewer"
              width="100%"
              height="600px"
              className="border border-gray-300 rounded-lg mt-4"
              onLoad={handleIframeLoad}
            ></iframe>

            <div className="sticky bottom-0 bg-white mt-4 py-2 flex justify-between items-center border-t">
              <button
                onClick={() => window.print()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Print Form
              </button>
              <button
                onClick={downloadFlattenedPDF}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </button>
              <button
                onClick={() => alert("PDF edited and saved!")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePDF;
