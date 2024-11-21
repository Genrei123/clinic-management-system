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
      branch: "Phase X",
      status: "In Stock",
      statusColor: "green",
    },
    {
      id: 2,
      name: "Vitamin B",
      quantity: 5,
      price: 5.0,
      expirationDate: "2024-12-15",
      branch: "Phase Y",
      status: "Low Stock",
      statusColor: "yellow",
    },
    {
      id: 3,
      name: "Vitamin C",
      quantity: 20,
      price: 1.75,
      expirationDate: "2023-11-30",
      branch: "Phase Z",
      status: "Expiring",
      statusColor: "orange",
    },
    {
      id: 4,
      name: "Antibiotic",
      quantity: 15,
      price: 3.0,
      expirationDate: "2024-05-10",
      branch: "Phase X",
      status: "Expired",
      statusColor: "red",
    },
    {
      id: 5,
      name: "Item 5",
      quantity: 0,
      price: 4.0,
      expirationDate: "2023-09-25",
      branch: "Phase Z",
      status: "Out of Stock",
      statusColor: "black",
    },
    {
      id: 6,
      name: "Item 6",
      quantity: 12,
      price: 6.5,
      expirationDate: "2024-03-20",
      branch: "Phase Y",
      status: "In Stock",
      statusColor: "green",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [items, setItems] = useState(initialItems);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    branch: "",
    status: "",
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const applyFilters = () => {
    let filteredItems = initialItems;

    // Apply sorting
    if (filters.sortBy === "A-Z") {
      filteredItems = [...filteredItems].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (filters.sortBy === "Price") {
      filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
    }

    // Apply branch filter
    if (filters.branch) {
      filteredItems = filteredItems.filter(
        (item) => item.branch === filters.branch
      );
    }

    // Apply status filter
    if (filters.status) {
      filteredItems = filteredItems.filter(
        (item) => item.status === filters.status
      );
    }

    setItems(filteredItems);
    setIsFilterVisible(false); // Hide filter modal
  };

  const clearFilters = () => {
    filters.sortBy = '';
    filters.branch = '';
    filters.sortBy = '';
    filters.status = '';

    let filteredItems = initialItems

    setItems(filteredItems);
    setIsFilterVisible(false);


  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = () => {
    if (selectedItems.length === 1) {
      alert(`Editing item: ${selectedItems[0]}`);
    }
  };

  const handleDeleteClick = () => {
    alert(`Deleting item(s): ${selectedItems.join(", ")}`);
    setSelectedItems([]); // Clear selection after deletion
  };

  // Check if the edit button should be visible (only if one item is selected)
  const isEditVisible = selectedItems.length === 1;
  // Check if the delete button should be visible (visible if any items are selected)
  const isDeleteVisible = selectedItems.length > 0;

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
              onClick={toggleFilterVisibility}
            >
              Filter
            </button>
          </div>

          {isFilterVisible && (
            <div className="filter-modal border p-4 rounded shadow bg-white">
              <h2 className="text-lg font-bold mb-2">Sort by:</h2>
              <div className="flex gap-2 mb-4">
                <button
                  className={`p-2 border rounded ${
                    filters.sortBy === "A-Z" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleFilterChange("sortBy", "A-Z")}
                >
                  A-Z
                </button>
                <button
                  className={`p-2 border rounded ${
                    filters.sortBy === "Price" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleFilterChange("sortBy", "Price")}
                >
                  Price
                </button>
              </div>
              <h2 className="text-lg font-bold mb-2">Sort by (Branch):</h2>
              <div className="flex gap-2 mb-4">
                {["Phase X", "Phase Y", "Phase Z"].map((branch) => (
                  <button
                    key={branch}
                    className={`p-2 border rounded ${
                      filters.branch === branch ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleFilterChange("branch", branch)}
                  >
                    {branch}
                  </button>
                ))}
              </div>
              <h2 className="text-lg font-bold mb-2">Sort by (Status):</h2>
              <div className="flex gap-2">
                {["In Stock", "Low Stock", "Expiring", "Expired", "Out of Stock"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`p-2 border rounded ${
                        filters.status === status ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleFilterChange("status", status)}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
              <button
                className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
                onClick={applyFilters}
              >
                Apply Filters
              </button>

              <button
                className="bg-gray-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
                onClick={clearFilters}
              >
                Clear Filter
              </button>
            </div>
          )}

          <div className="inventory-table-container mt-4">
            <table className="inventory-table w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Select</th>
                  <th className="border p-2">Medicine</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price (₱/pc)</th>
                  <th className="border p-2">Expiration Date</th>
                  <th className="border p-2">Branch</th>
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
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.price}</td>
                    <td className="border p-2">{item.expirationDate}</td>
                    <td className="border p-2">{item.branch}</td>
                    <td
                      className="border p-2"
                      style={{ backgroundColor: item.statusColor }}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="actions mt-4">
            {isEditVisible && (
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mr-2"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
            {isDeleteVisible && (
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
