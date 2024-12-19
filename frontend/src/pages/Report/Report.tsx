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
  item_stock: number;
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
  items: Item[];
  totalCost: number;
  notes: string;
}

interface RenderedServiceDetail {
  serviceID: number;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
}

// Interface for Chart Data
interface ChartData {
  name: string;
  value: number;
}

const Report: React.FC = () => {
  const [serviceData, setServiceData] = useState<ChartData[]>([]);
  const [medicineData, setMedicineData] = useState<ChartData[]>([]);
  const [stockData, setStockData] = useState<ChartData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, renderedServicesResponse, itemsResponse] = await Promise.all([
          axiosInstance.get<Service[]>("http://localhost:8080/service/getServices"),
          axiosInstance.get<RenderedService[]>("http://localhost:8080/service/getRenderedServices"),
          axiosInstance.get<Item[]>("http://localhost:8080/items")
        ]);

        setServices(servicesResponse.data);
        aggregateData(renderedServicesResponse.data, itemsResponse.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const aggregateData = (renderedServices: RenderedService[], items: Item[]) => {
    const serviceCountMap: { [key: string]: number } = {};
    const medicineCountMap: { [key: string]: number } = {};
    const stockMap: { [key: string]: number } = {};

    // Initialize stockMap and medicineCountMap with current stock levels and initial quantities
    items.forEach((item) => {
      stockMap[item.item_name] = item.item_stock;
      medicineCountMap[item.item_name] = item.item_quantity - item.item_stock;
    });

    renderedServices.forEach((renderedService) => {
      // Aggregate services
      renderedService.services.forEach((service) => {
        serviceCountMap[service.serviceName] = (serviceCountMap[service.serviceName] || 0) + 1;
      });

      // We don't need to aggregate medicines sold here anymore as it's calculated from the items data
    });

    setServiceData(Object.entries(serviceCountMap).map(([name, value]) => ({ name, value })));
    setMedicineData(Object.entries(medicineCountMap).map(([name, value]) => ({ name, value })));
    setStockData(Object.entries(stockMap).map(([name, value]) => ({ name, value })));
  };

  const calculateGradient = (data: ChartData[]) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
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

  const getColor = (index: number) => {
    const colors = ["#4EAACB", "#FF1E1E", "#54FB3E", "#FFA500", "#800080", "#FFB6C1", "#8A2BE2"];
    return colors[index % colors.length];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="p-6">
          <section className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Count / Sold / Stock</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((service, index) => (
                  <tr key={`service-${index}`} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border px-4 py-2">Service</td>
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">{service.value}</td>
                  </tr>
                ))}
                {medicineData.map((medicine, index) => (
                  <tr key={`medicine-${index}`} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border px-4 py-2">Medicine Sold</td>
                    <td className="border px-4 py-2">{medicine.name}</td>
                    <td className="border px-4 py-2">{medicine.value}</td>
                  </tr>
                ))}
                {stockData.map((stock, index) => (
                  <tr key={`stock-${index}`} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border px-4 py-2">Current Stock</td>
                    <td className="border px-4 py-2">{stock.name}</td>
                    <td className="border px-4 py-2">{stock.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="grid grid-cols-2 gap-6">
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

        
        </main>
      </div>
    </div>
  );
};

export default Report;
// This function can be used to process or store the services data if needed
const setServices = (data: Service[]) => {
  console.log("Services data:", data);
};

