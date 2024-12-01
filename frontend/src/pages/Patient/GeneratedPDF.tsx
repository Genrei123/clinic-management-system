import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import { ArrowLeft } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import CSF from "../../assets/pdf/CF2.pdf";
import ClaimForm1 from "../../assets/pdf/CF2.pdf";
import ClaimForm2 from "../../assets/pdf/CF2.pdf";

type PatientType = 'Parent' | 'Child';

const GeneratePDF: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formType, setFormType] = useState<string | null>(searchParams.get("form") || "CSF");
  const [patientType, setPatientType] = useState<PatientType>('Parent');
  const patientId = searchParams.get("patientId");
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams((params) => {
      params.set("form", formType || "CSF");
      return params;
    });
  }, [formType, setSearchParams]);

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
      link.download = `flattened_${formType?.replace(/\s+/g, '_').toLowerCase()}_${patientType.toLowerCase()}_${patientId}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error flattening PDF:", error);
      alert("An error occurred while flattening the PDF. Please try again.");
    }
  };

  const handleFormChange = (newFormType: string) => {
    setFormType(newFormType);
    setLoading(true);
    setIframeKey(prevKey => prevKey + 1);
  };

  const handlePatientTypeChange = (newPatientType: PatientType) => {
    setPatientType(newPatientType);
    setLoading(true);
    setIframeKey(prevKey => prevKey + 1);
  };

  const handleGoBack = () => {
    navigate('/patientrecords');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center">
                <Link
                  to={`/patient/${patientId}`}
                  className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 flex items-center"
                  aria-label="Go back to Patient Records"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <h2 className="text-3xl font-bold">Generate PDF</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Patient ID:</span>
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">{patientId}</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <span className="font-semibold text-gray-700">Form Type:</span>
                    <div className="flex space-x-2">
                      {["CSF", "Claim Form 1", "Claim Form 2"].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleFormChange(type)}
                          className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                            formType === type
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="font-semibold text-gray-700 mr-2">Patient Type:</span>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                      type="button"
                      onClick={() => handlePatientTypeChange('Parent')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                        patientType === 'Parent'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      } border border-gray-200`}
                    >
                      Parent
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePatientTypeChange('Child')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                        patientType === 'Child'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      } border border-gray-200`}
                    >
                      Child
                    </button>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden shadow-md" style={{ height: "70vh" }}>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    key={`${iframeKey}-${patientType}`}
                    src={getPDFFile()}
                    title="PDF Viewer"
                    width="100%"
                    height="100%"
                    className="border-none"
                    onLoad={handleIframeLoad}
                  ></iframe>
                </div>
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeneratePDF;

