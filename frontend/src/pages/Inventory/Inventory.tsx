import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./inventory.css";

// Define the structure of an inventory item
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  manufacturedDate: string;
  expirationDate: string;
  branch: string;
  status: string;
  statusColor: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Inventory: React.FC = () => {
  const initialItems: InventoryItem[] = [
    {
      id: 1,
      name: "Paracetamol",
      quantity: 50,
      price: 2.5,
      manufacturedDate: "2023-01-10",
      expirationDate: "2024-01-10",
      branch: "Phase X",
      status: "In Stock",
      statusColor: "green",
    },
    // Other items...
  ];

  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // Will set this once I've enabled the functions in the Filter Buttons
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      // Open a modal or form to edit the item details
      console.log('Edit item:', itemToEdit);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleFilterPopup = () => {
    setShowFilterPopup((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="inventory-container p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Inventory Overview</h1>
        <div className="search-bar mb-4 flex gap-2 relative">
          <div className="relative w-full">
            <input
              type="text"
              className="border p-2 w-full rounded"
              placeholder="Search for a product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={toggleFilterPopup}
            className={`px-4 py-2 rounded ${
              isFilterActive ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
            }`}
          >
            Filter
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={selectedItems.length === 0}
          >
            Delete Selected
          </button>

          {showFilterPopup && (
            <div className="filter-popup">
              <div className="filter-section">
                <h3 className="font-semibold">Sort by:</h3>
                <button className="filter-button">A-Z</button>
                <button className="filter-button">Price</button>
                <button className="filter-button">Ascending</button>
              </div>
              <div className="filter-section">
                <h3 className="font-semibold">Sort by (Branch):</h3>
                <button className="filter-button">Phase X</button>
                <button className="filter-button">Phase Y</button>
                <button className="filter-button">Phase Z</button>
              </div>
              <div className="filter-section">
                <h3 className="font-semibold">Sort by (Status):</h3>
                <button className="filter-button">In Stock</button>
                <button className="filter-button">Low Stock</button>
                <button className="filter-button">Expiring</button>
                <button className="filter-button">Out of Stock</button>
              </div>
            </div>
          )}
        </div>

        <TableContainer component={Paper}>
          <Table className="inventory-table" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedItems.length > 0 && selectedItems.length < items.length
                    }
                    checked={
                      items.length > 0 && selectedItems.length === items.length
                    }
                    onChange={(e) =>
                      setSelectedItems(
                        e.target.checked ? items.map((item) => item.id) : []
                      )
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>Medicine</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price (₱/pc)</StyledTableCell>
                <StyledTableCell align="right">Manufactured Date</StyledTableCell>
                <StyledTableCell align="right">Expiration Date</StyledTableCell>
                <StyledTableCell align="right">Branch</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.manufacturedDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.expirationDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.branch}</StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ color: item.statusColor }}
                  >
                    {item.status}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-start mt-4">
          <button
            onClick={() => handleEdit(selectedItems[0])}
            className="p-2 bg-yellow-500 text-white rounded"
            disabled={selectedItems.length !== 1}
          >
            Edit Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;