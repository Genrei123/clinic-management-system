import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

interface Report {
  date: string;
  serviceAvailed: number;
  medicineSold: number;
  patientCheckIns: number;
  employeeCheckIns: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface MonthlyReport {
  yearMonth: string;
  employeeCheckIns: number;
  patientCheckIns: number;
}

const Report: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [serviceData, setServiceData] = useState<ChartData[]>([]); // Pie chart data for services
  const [medicineData, setMedicineData] = useState<ChartData[]>([]); // Pie chart data for medicines

  useEffect(() => {
    // Fetch report data
    axios
      .get("http://localhost:8080/reports")
      .then((response) => {
        console.log("Report Data:", response.data);
        if (Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          console.error("Invalid report data structure", response.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch dynamic report data
    axios
      .get("http://localhost:8080/reports/dynamic")
      .then((response) => {
        console.log("Dynamic Report Data:", response.data);
        const dynamicReport = response.data;
        if (dynamicReport) {
          setReports((prevReports) => [
            ...prevReports,
            {
              date: "Dynamic",
              serviceAvailed: 0,
              medicineSold: 0,
              patientCheckIns: dynamicReport.patientCheckIns || 0,
              employeeCheckIns: dynamicReport.employeeCheckIns || 0,
            },
          ]);
        }
      })
      .catch((error) => console.error("Error fetching dynamic data:", error));

    // Fetch monthly check-ins data
    axios
      .get("http://localhost:8080/api/reports/monthly-checkins")
      .then((response) => {
        console.log("Monthly Reports:", response.data);
        if (Array.isArray(response.data)) {
          setMonthlyReports(response.data);
        } else {
          console.error("Invalid monthly report data structure", response.data);
        }
      })
      .catch((error) => console.error("Error fetching monthly check-ins:", error));

    // Mock data for pie charts (replace with actual data from backend as needed)
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

  // Helper function to calculate the total of patients check-ins
  const getTotalPatientsCheckIns = () => {
    return monthlyReports.reduce((acc, report) => acc + report.patientCheckIns, 0);
  };

  // Helper function to calculate the total of employee check-ins
  const getTotalEmployeeCheckIns = () => {
    return monthlyReports.reduce((acc, report) => acc + report.employeeCheckIns, 0);
  };

  // Helper function to calculate the total percentage for service rendered
  const getTotal = (data: ChartData[]) => {
    return data.reduce((acc, item) => acc + item.value, 0);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="p-6">
          {/* Monthly Check-Ins Table */}
          <section className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Total Patients Check-Ins</th>
                  <th className="px-4 py-2">Total Employee Check-Ins</th>
                  <th className="px-4 py-2">Total Service Rendered</th>
                  <th className="px-4 py-2">Total Medicine Sold</th>
                </tr>
              </thead>
              <tbody>
                {monthlyReports.length > 0 ? (
                  monthlyReports.map((report, index) => (
                    <tr key={`monthly-${index}`} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border px-4 py-2">{report.yearMonth}</td>
                      <td className="border px-4 py-2">{report.patientCheckIns}</td>
                      <td className="border px-4 py-2">{report.employeeCheckIns}</td>
                      <td className="border px-4 py-2">{getTotal(serviceData)}</td>
                      <td className="border px-4 py-2">{getTotal(medicineData)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="border px-4 py-12 text-center">
                      No monthly check-in data available
                    </td>
                  </tr>
                )}

                {/* Totals Row */}
                <tr>
                  <td className="border px-4 py-2 font-bold">Total</td>
                  <td className="border px-4 py-2 font-bold">{getTotalPatientsCheckIns()}</td>
                  <td className="border px-4 py-2 font-bold">{getTotalEmployeeCheckIns()}</td>
                  <td className="border px-4 py-2 font-bold">{getTotal(serviceData)}</td>
                  <td className="border px-4 py-2 font-bold">{getTotal(medicineData)}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Pie Charts for Service Rendered and Medicine Sold */}
          <section className="grid grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
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

            <div className="bg-white shadow rounded-lg p-6">
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
