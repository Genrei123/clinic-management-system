import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "../../components/Sidebar";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
    // Additional items here for pagination...
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
    
  ];

  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const itemsPerPage = 10;
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
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

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={selectedItems.length === 0}
          >
            Delete Selected
          </button>
        </div>

        <TableContainer component={Paper}>
          <Table className="inventory-table" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < displayedItems.length
                    }
                    checked={
                      displayedItems.length > 0 &&
                      selectedItems.length === displayedItems.length
                    }
                    onChange={(e) =>
                      setSelectedItems(
                        e.target.checked
                          ? displayedItems.map((item) => item.id)
                          : []
                      )
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>Medicine</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price (₱/pc)</StyledTableCell>
                <StyledTableCell align="right">
                  Manufactured Date
                </StyledTableCell>
                <StyledTableCell align="right">Expiration Date</StyledTableCell>
                <StyledTableCell align="right">Branch</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedItems.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.quantity}
                  </StyledTableCell>
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
        <Pagination
          className="mt-4"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
        <button
          onClick={() => handleEdit(selectedItems[0])}
          className="mt-4 p-2 bg-yellow-500 text-white rounded"
          disabled={selectedItems.length !== 1}
        >
          Edit Selected
        </button>

        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box sx={modalStyle}>
            <h2>Edit Item</h2>
            {editingItem && (
              <div>
                <p>Editing: {editingItem.name}</p>
                {/* Add form inputs for editing */}
                <button
                  onClick={handleModalClose}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Inventory;
