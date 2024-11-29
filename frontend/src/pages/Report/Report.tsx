import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

interface ReportData {
  date: string;
  serviceAvailed: number;
  medicineSold: number;
  patientsCheckIns: number;
  employeeCheckIns: number;
}

interface ChartData {
  name: string;
  value: number;
}

const Report: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [serviceData, setServiceData] = useState<ChartData[]>([]);
  const [medicineData, setMedicineData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Fetch report data
    fetch("/api/reports")
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching data:", error));

    // Mock data for pie charts
    setServiceData([
      { name: "Ultrasound", value: 22 },
      { name: "Laboratory", value: 33 },
      { name: "Check-Up", value: 45 },
    ]);

    setMedicineData([
      { name: "Advil", value: 22 },
      { name: "Biogesic", value: 33 },
      { name: "Stresstabs", value: 45 },
    ]);
  }, []);

  const calculateGradient = (data: ChartData[]) => {
    let cumulativePercentage = 0;
    return (
      "conic-gradient(" +
      data
        .map((item, index) => {
          const start = cumulativePercentage;
          cumulativePercentage += item.value;
          return `${getColor(index)} ${start}% ${cumulativePercentage}%`;
        })
        .join(", ") +
      ")"
    );
  };

  const getColor = (index: number) => {
    const colors = ["#4EAACB", "#FF1E1E", "#54FB3E", "#FFA500", "#800080"];
    return colors[index % colors.length];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar hideSearch={true} />

        {/* Main Content */}
        <main className="flex-grow p-6">
          <section className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Service Availed</th>
                  <th className="px-4 py-2">Medicine Sold</th>
                  <th className="px-4 py-2">Patients Check-Ins</th>
                  <th className="px-4 py-2">Employee Check-Ins</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border px-4 py-2">{report.date}</td>
                      <td className="border px-4 py-2">
                        {report.serviceAvailed}
                      </td>
                      <td className="border px-4 py-2">{report.medicineSold}</td>
                      <td className="border px-4 py-2">
                        {report.patientsCheckIns}
                      </td>
                      <td className="border px-4 py-2">
                        {report.employeeCheckIns}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="border px-4 py-12 text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="grid grid-cols-2 gap-6">
            {/* Service Rendered */}
            <div className="bg-white shadow rounded-lg p-36">
              <h2 className="text-lg font-bold mb-4">Service Rendered</h2>
              <div className="flex items-center justify-center">
                <div
                  className="pie-chart"
                  style={{
                    background: calculateGradient(serviceData),
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              {/* Legend for Services */}
              <ul className="mt-6">
                {serviceData.map((item, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span
                      className="w-4 h-4 inline-block mr-2"
                      style={{ backgroundColor: getColor(index) }}
                    ></span>
                    {item.name}: {item.value}%
                  </li>
                ))}
              </ul>
            </div>

            {/* Medicine Sold */}
            <div className="bg-white shadow rounded-lg p-36">
              <h2 className="text-lg font-bold mb-4">Medicine Sold</h2>
              <div className="flex items-center justify-center">
                <div
                  className="pie-chart"
                  style={{
                    background: calculateGradient(medicineData),
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              {/* Legend for Medicines */}
              <ul className="mt-6">
                {medicineData.map((item, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span
                      className="w-4 h-4 inline-block mr-2"
                      style={{ backgroundColor: getColor(index) }}
                    ></span>
                    {item.name}: {item.value}%
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Report;
