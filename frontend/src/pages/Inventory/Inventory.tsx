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
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
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
    // ... (other items)
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <div className="inventory-container p-8 h-full overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory Overview</h1>
          <div className="search-bar mb-6 flex gap-4">
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for a product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={selectedItems.length === 0}
            >
              Delete Selected
            </button>
          </div>

          <TableContainer component={Paper} className="shadow-md rounded-lg overflow-hidden">
            <Table className="inventory-table" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedItems.length > 0 && selectedItems.length < displayedItems.length}
                      checked={displayedItems.length > 0 && selectedItems.length === displayedItems.length}
                      onChange={(e) => setSelectedItems(e.target.checked ? displayedItems.map((item) => item.id) : [])}
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
                {displayedItems.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelect(item.id)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                    <StyledTableCell align="right">{item.price.toFixed(2)}</StyledTableCell>
                    <StyledTableCell align="right">{item.manufacturedDate}</StyledTableCell>
                    <StyledTableCell align="right">{item.expirationDate}</StyledTableCell>
                    <StyledTableCell align="right">{item.branch}</StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ color: item.statusColor, fontWeight: 'bold' }}
                    >
                      {item.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <div className="mt-6 flex justify-between items-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
            <button
              onClick={() => handleEdit(selectedItems[0])}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={selectedItems.length !== 1}
            >
              Edit Selected
            </button>
          </div>

          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="edit-item-modal"
            aria-describedby="modal-to-edit-inventory-item"
          >
            <Box sx={modalStyle}>
              <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
              {editingItem && (
                <div>
                  <p className="mb-4">Editing: <span className="font-semibold">{editingItem.name}</span></p>
                  {/* Add form inputs for editing */}
                  <button
                    onClick={handleModalClose}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

