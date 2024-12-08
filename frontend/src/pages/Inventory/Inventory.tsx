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
  width: 600,
  maxHeight: '80vh', // Limit modal height
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "In Stock":
      return "green";
    case "Out of Stock":
      return "red";
    case "Low Stock":
      return "gold";
    case "Expired":
      return "red";
    case "Expiring":
      return "orange";
    default:
      return "gray";
  }
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
      statusColor: getStatusColor("In Stock"),
    },
    // Add more items as needed...
  ];

  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false); // Add Item modal state
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItems, setNewItems] = useState<InventoryItem[]>([
    {
      id: items.length + 1,
      name: "",
      quantity: 0,
      price: 0,
      manufacturedDate: "",
      expirationDate: "",
      branch: "",
      status: "In Stock",  // Default value for status
      statusColor: getStatusColor("In Stock"),  // Default color
    },
  ]);

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
  
  const handleEditSubmit = () => {
    if (editingItem) {
      // Recalculate statusColor based on the updated status
      const updatedItem = {
        ...editingItem,
        statusColor: getStatusColor(editingItem.status),
      };
  
      // Update the inventory list
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
  
      handleModalClose(); // Close the modal
    }
  };
  

  const handleEditChange = (field: keyof InventoryItem, value: string | number) => {
    setEditingItem((prev) =>
      prev ? { ...prev, [field]: value } : null
    );
  };
  
  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  

  // Add Item Modal functions
  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewItems([
      {
        id: items.length + 1,
        name: "",
        quantity: 0,
        price: 0,
        manufacturedDate: "",
        expirationDate: "",
        branch: "",
        status: "In Stock",  // Default value for status
        statusColor: getStatusColor("In Stock"), // Default color
      },
    ]);
  };

  const handleAddItemChange = (
    index: number,
    field: keyof InventoryItem,
    value: string | number
  ) => {
    setNewItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      // Update status color whenever the status changes
      if (field === "status") {
        updatedItems[index].statusColor = getStatusColor(updatedItems[index].status);
      }

      return updatedItems;
    });
  };

  const handleAddMoreItem = () => {
    setNewItems((prevItems) => [
      ...prevItems,
      {
        id: items.length + prevItems.length + 1, // Incrementing the ID for each new item
        name: "",
        quantity: 0,
        price: 0,
        manufacturedDate: "",
        expirationDate: "",
        branch: "",
        status: "In Stock",
        statusColor: getStatusColor("In Stock"),
      },
    ]);
  };

  const handleAddItemSubmit = () => {
    // Ensure unique IDs by using the current length of `items`
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      id: items.length + index + 1, // Correct ID generation
    }));
  
    setItems((prev) => [...prev, ...updatedItems]); // Update the items state with the new items
    handleAddModalClose(); // Close the modal after adding items
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
            <button
              onClick={handleAddModalOpen}
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Add Item
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
                    <StyledTableCell align="right" style={{ color: item.statusColor }}>
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
              variant="outlined"
              shape="rounded"
            />
                        <button
              onClick={() => handleEdit(selectedItems[0])}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={selectedItems.length !== 1}
            >
              Edit Selected
            </button>
          </div>
          
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="add-item-modal"
        aria-describedby="modal-to-add-inventory-item"
      >
        <Box sx={modalStyle}>
          <h2 className="text-2xl font-bold mb-4">Add New Items</h2>
          <div className="overflow-y-auto max-h-[60vh]">
            {newItems.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-4">Item {index + 1}</h3>
                <label className="block mb-2 font-semibold">Name:</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleAddItemChange(index, "name", e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                />
                <label className="block mb-2 font-semibold">Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleAddItemChange(index, "quantity", Number(e.target.value))}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                />
                <label className="block mb-2 font-semibold">Price:</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleAddItemChange(index, "price", Number(e.target.value))}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                />
                <label className="block mb-2 font-semibold">Manufactured Date:</label>
                <input
                  type="date"
                  value={item.manufacturedDate}
                  onChange={(e) => handleAddItemChange(index, "manufacturedDate", e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                />
                <label className="block mb-2 font-semibold">Expiration Date:</label>
                <input
                  type="date"
                  value={item.expirationDate}
                  onChange={(e) => handleAddItemChange(index, "expirationDate", e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                />
                <label className="block mb-2 font-semibold">Branch:</label>
                <input
                  type="text"
                  value={item.branch}
                  onChange={(e) => handleAddItemChange(index, "branch", e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                />
                <label className="block mb-2 font-semibold">Status:</label>
                <select
                  value={item.status}
                  onChange={(e) => handleAddItemChange(index, "status", e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Expired">Expired</option>
                  <option value="Expiring">Expiring</option>
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleAddMoreItem}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Add Another Item
            </button>
            <button
              onClick={handleAddItemSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Add Items
            </button>
          </div>
        </Box>
      </Modal>
        
{/* Edit Item Modal */}
<Modal
  open={isModalOpen}
  onClose={handleModalClose}
  aria-labelledby="edit-item-modal"
  aria-describedby="modal-to-edit-inventory-item"
>
  <Box sx={{ ...modalStyle, maxHeight: '80vh', overflow: 'hidden' }}>
    <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
    {editingItem && (
      <div className="overflow-y-auto max-h-[60vh] pr-4">
        <p className="mb-4">
          Editing: <span className="font-semibold">{editingItem.name}</span>
        </p>
        <label className="block mb-2 font-semibold">Name:</label>
        <input
          type="text"
          value={editingItem.name}
          onChange={(e) => handleEditChange("name", e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        />
        <label className="block mb-2 font-semibold">Quantity:</label>
        <input
          type="number"
          value={editingItem.quantity}
          onChange={(e) => handleEditChange("quantity", Number(e.target.value))}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        />
        <label className="block mb-2 font-semibold">Price:</label>
        <input
          type="number"
          value={editingItem.price}
          onChange={(e) => handleEditChange("price", Number(e.target.value))}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        />
        <label className="block mb-2 font-semibold">Manufactured Date:</label>
        <input
          type="date"
          value={editingItem.manufacturedDate}
          onChange={(e) => handleEditChange("manufacturedDate", e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        />
        <label className="block mb-2 font-semibold">Expiration Date:</label>
        <input
          type="date"
          value={editingItem.expirationDate}
          onChange={(e) => handleEditChange("expirationDate", e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        />
        <label className="block mb-2 font-semibold">Branch:</label>
        <input
          type="text"
          value={editingItem.branch}
          onChange={(e) => handleEditChange("branch", e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        />
        <label className="block mb-2 font-semibold">Status:</label>
        <select
          value={editingItem.status}
          onChange={(e) => handleEditChange("status", e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm mb-4"
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Expired">Expired</option>
          <option value="Expiring">Expiring</option>
        </select>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEditSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    )}
  </Box>
</Modal>

    </div>
  );
};

export default Inventory;
