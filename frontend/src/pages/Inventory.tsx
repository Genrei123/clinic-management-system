import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Ensure this is the correct path
import "./inventory.css"; // Ensure to import your CSS file

const Inventory: React.FC = () => {
  const initialItems = [
    {
      id: 1,
      name: "Paracetamol",
      quantity: 10,
      price: 2.5,
      expirationDate: "2025-01-01",
      status: "In Stock",
      statusColor: "green",
    },
    {
      id: 2,
      name: "Vitamin B",
      quantity: 5,
      price: 5.0,
      expirationDate: "2024-12-15",
      status: "Low Stock",
      statusColor: "yellow",
    },
    {
      id: 3,
      name: "Vitamin C",
      quantity: 20,
      price: 1.75,
      expirationDate: "2023-11-30",
      status: "Expiring",
      statusColor: "orange",
    },
    {
      id: 4,
      name: "Antibiotic",
      quantity: 15,
      price: 3.0,
      expirationDate: "2024-05-10",
      status: "Expired",
      statusColor: "red",
    },
    {
      id: 5,
      name: "Item 5",
      quantity: 0,
      price: 4.0,
      expirationDate: "2023-09-25",
      status: "Out of Stock",
      statusColor: "black",
    },
    {
      id: 6,
      name: "Item 6",
      quantity: 12,
      price: 6.5,
      expirationDate: "2024-03-20",
      status: "In Stock",
      statusColor: "green",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [items] = useState(initialItems);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    // Add filter logic here if needed
    alert("Filter button clicked!");
  };

  const handleRowClick = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCheckboxChange = (id: number) => {
    handleRowClick(id); // Sync checkbox with row click
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="inventory-container p-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Inventory Overview</h1>
          <div className="search-bar mb-4 flex gap-2">
            <input
              type="text"
              className="border p-2 w-full rounded"
              placeholder="Search for a product..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleFilterClick}
            >
              Filter
            </button>
          </div>
          <div className="inventory-table-container">
            <table className="inventory-table w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Select</th>
                  <th className="border p-2">Medicine</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price (₱/pc)</th>
                  <th className="border p-2">Expiration Date</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`cursor-pointer ${
                      selectedItems.includes(item.id)
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td
                      className="border p-2"
                      onClick={() => handleRowClick(item.id)}
                    >
                      {item.name}
                    </td>
                    <td
                      className="border p-2"
                      onClick={() => handleRowClick(item.id)}
                    >
                      {item.quantity}
                    </td>
                    <td
                      className="border p-2"
                      onClick={() => handleRowClick(item.id)}
                    >
                      ₱{item.price.toFixed(2)}
                    </td>
                    <td
                      className="border p-2"
                      onClick={() => handleRowClick(item.id)}
                    >
                      {item.expirationDate}
                    </td>
                    <td
                      className="border p-2"
                      style={{
                        color: item.statusColor,
                        fontWeight: "bold",
                      }}
                      onClick={() => handleRowClick(item.id)}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
