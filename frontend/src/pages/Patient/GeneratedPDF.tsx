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
    try {
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
      link.download = `flattened_${formType?.replace(/\s+/g, '_').toLowerCase()}_${patientId}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error flattening PDF:", error);
      alert("An error occurred while flattening the PDF. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 bg-blue-500 text-white">
                <h2 className="text-2xl font-bold">Generate PDF</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Form:</span>
                    <span>{formType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Patient ID:</span>
                    <span>{patientId}</span>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden" style={{ height: "70vh" }}>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    src={getPDFFile()}
                    title="PDF Viewer"
                    width="100%"
                    height="100%"
                    className="border border-gray-300 rounded-lg"
                    onLoad={handleIframeLoad}
                  ></iframe>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Print Form
                </button>
                <button
                  onClick={downloadFlattenedPDF}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => alert("PDF edited and saved!")}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeneratePDF;

