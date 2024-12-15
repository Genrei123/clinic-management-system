// src/components/Report.tsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../config/axiosConfig";

// Interface for Service
interface Service {
  serviceID: number;
  service_name: string;
  service_description: string;
  service_price: number;
}

// Interface for Item (Medicine)
interface Item {
  itemID: number;
  status: string;
  branch: Branch;
  item_name: string;
  item_quantity: number;
  item_price: number;
  manufacture_date: string;
  exp_date: string;
}

interface Branch {
  branchID: number;
  branch_name: string;
  branch_address: string;
  branch_contact: string;
}

// Interface for Rendered Service by Patient
interface RenderedService {
  id: number;
  patientId: number;
  services: RenderedServiceDetail[];
  items: SoldItem[];
  totalCost: number;
  notes: string;
}

interface RenderedServiceDetail {
  serviceID: number;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
}

interface SoldItem {
  itemID: number;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
}

// Interface for Chart Data
interface ChartData {
  name: string;
  value: number;
}

const Report: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [renderedServices, setRenderedServices] = useState<RenderedService[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [serviceData, setServiceData] = useState<ChartData[]>([]); // Pie chart data for services
  const [medicineData, setMedicineData] = useState<ChartData[]>([]); // Pie chart data for medicines
  const [stockData, setStockData] = useState<ChartData[]>([]); // Bar chart data for stock

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all services
        const servicesResponse = await axiosInstance.get<Service[]>(
          "http://localhost:8080/service/getServices"
        );
        setServices(servicesResponse.data);
        console.log("Services Data:", servicesResponse.data);

        // Fetch all rendered services
        const renderedServicesResponse = await axiosInstance.get<RenderedService[]>(
          "http://localhost:8080/service/getRenderedServices"
        );
        setRenderedServices(renderedServicesResponse.data);
        console.log("Rendered Services Data:", renderedServicesResponse.data);

        // Fetch all items (medicines)
        const itemsResponse = await axiosInstance.get<Item[]>(
          "http://localhost:8080/items"
        );
        setItems(itemsResponse.data);
        console.log("Items Data:", itemsResponse.data);

        // Aggregate data with renderedServices and items
        aggregateData(renderedServicesResponse.data, itemsResponse.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to aggregate service and medicine data
  const aggregateData = (data: RenderedService[], items: Item[]) => {
    const serviceCountMap: { [key: string]: number } = {};
    const medicineCountMap: { [key: string]: number } = {};

    data.forEach((renderedService) => {
      // Aggregate services
      renderedService.services.forEach((service) => {
        serviceCountMap[service.serviceName] =
          (serviceCountMap[service.serviceName] || 0) + 1;
      });

      // Aggregate medicines
      renderedService.items.forEach((item) => {
        medicineCountMap[item.itemName] =
          (medicineCountMap[item.itemName] || 0) + item.itemQuantity;
      });
    });

    // Convert maps to ChartData arrays
    const aggregatedServices: ChartData[] = Object.entries(serviceCountMap).map(
      ([name, value]) => ({ name, value })
    );

    const aggregatedMedicines: ChartData[] = Object.entries(medicineCountMap).map(
      ([name, value]) => ({ name, value })
    );

    // For stock data, we can display item quantities
    const aggregatedStock: ChartData[] = items.map((item) => ({
      name: item.item_name,
      value: item.item_quantity,
    }));

    setServiceData(aggregatedServices);
    setMedicineData(aggregatedMedicines);
    setStockData(aggregatedStock);
  };

  // Function to calculate gradient for pie charts
  const calculateGradient = (data: ChartData[]) => {
    const total = getTotal(data);
    let cumulativePercentage = 0;
    return (
      "conic-gradient(" +
      data
        .map((item, index) => {
          const start = (cumulativePercentage / total) * 100;
          cumulativePercentage += item.value;
          const end = (cumulativePercentage / total) * 100;
          return `${getColor(index)} ${start}% ${end}%`;
        })
        .join(", ") +
      ")"
    );
  };

  // Function to get color based on index
  const getColor = (index: number) => {
    const colors = [
      "#4EAACB",
      "#FF1E1E",
      "#54FB3E",
      "#FFA500",
      "#800080",
      "#FFB6C1",
      "#8A2BE2",
    ];
    return colors[index % colors.length];
  };

  // Helper function to calculate the total for pie charts
  const getTotal = (data: ChartData[]) => {
    return data.reduce((acc, item) => acc + item.value, 0);
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-full flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="p-6">
          {/* Services, Medicines, and Stock Summary Table */}
          <section className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Count / Quantity</th>
                </tr>
              </thead>
              <tbody>
                {/* Services Data */}
                {serviceData.length > 0 ? (
                  serviceData.map((service, index) => (
                    <tr
                      key={`service-${index}`}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border px-4 py-2">Service</td>
                      <td className="border px-4 py-2">{service.name}</td>
                      <td className="border px-4 py-2">{service.value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border px-4 py-12 text-center">
                      No service data available
                    </td>
                  </tr>
                )}

                {/* Medicines Sold Data */}
                {medicineData.length > 0 ? (
                  medicineData.map((medicine, index) => (
                    <tr
                      key={`medicine-${index}`}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border px-4 py-2">Medicine Sold</td>
                      <td className="border px-4 py-2">{medicine.name}</td>
                      <td className="border px-4 py-2">{medicine.value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border px-4 py-12 text-center">
                      No medicine sales data available
                    </td>
                  </tr>
                )}

                {/* Current Stock Data */}
                {stockData.length > 0 ? (
                  stockData.map((item, index) => (
                    <tr
                      key={`stock-${index}`}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border px-4 py-2">Current Stock</td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border px-4 py-12 text-center">
                      No stock data available
                    </td>
                  </tr>
                )}

                {/* Totals Row */}
                <tr>
                  <td className="border px-4 py-2 font-bold">Total</td>
                  <td className="border px-4 py-2 font-bold">-</td>
                  <td className="border px-4 py-2 font-bold">
                    {getTotal(serviceData) + getTotal(medicineData)}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Pie Charts for Services and Medicines */}
          <section className="grid grid-cols-2 gap-6">
            {/* Service Rendered Pie Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Services Rendered</h2>
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
                    {item.name}: {item.value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Medicine Sold Pie Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Medicines Sold</h2>
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
                    {item.name}: {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Current Stock Bar Chart */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Current Stock</h2>
            <div className="flex items-center justify-center">
              <div className="bar-chart" style={{ width: "100%", height: "300px" }}>
                {/* Simple Bar Chart using Flexbox */}
                <div className="flex items-end justify-around h-full">
                  {stockData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-green-500"
                        style={{
                          width: "30px",
                          height: `${(item.value / Math.max(...stockData.map(d => d.value))) * 100}%`,
                        }}
                      ></div>
                      <span className="mt-2 text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ul className="mt-6">
              {stockData.map((item, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span
                    className="w-4 h-4 inline-block mr-2 bg-green-500"
                  ></span>
                  {item.name}: {item.value}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Report;
