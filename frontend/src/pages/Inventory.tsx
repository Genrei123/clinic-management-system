import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './inventory.css'; // Ensure to import your CSS file

const Inventory: React.FC = () => {
    const initialItems = [
        { id: 1, name: 'Paracetamol', quantity: 10, price: 2.5, expirationDate: '2025-01-01', colorClass: 'red' },
        { id: 2, name: 'Vitamin B', quantity: 5, price: 5.0, expirationDate: '2024-12-15', colorClass: 'green' },
        { id: 3, name: 'Vitamin C', quantity: 20, price: 1.75, expirationDate: '2023-11-30', colorClass: 'blue' },
        { id: 4, name: 'Antibiotic', quantity: 15, price: 3.0, expirationDate: '2024-05-10', colorClass: 'orange' },
        // Add more items as needed
        { id: 5, name: 'Item 5', quantity: 8, price: 4.0, expirationDate: '2023-09-25', colorClass: 'purple' },
        { id: 6, name: 'Item 6', quantity: 12, price: 6.5, expirationDate: '2024-03-20', colorClass: 'yellow' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [items] = useState(initialItems);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Inventory</h1>

                {/* Search Bar Container */}
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                </div>

                {/* Large Frame Rectangle */}
                <div className="inventory-frame">
                <h1 className="inventory-heading text-2xl font-bold">MEDICINE</h1>
                    <ul className="mt-2">
                        {filteredItems.map(item => (
                            <li key={item.id} className={`inventory-item ${item.colorClass}`}>
                                <div className={`item-container ${item.colorClass}`}>
                                    <div className="item-details">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-quantity">Quantity: {item.quantity}</span>
                                        <span className="item-price">Price: ${item.price.toFixed(2)}</span>
                                        <span className="item-expiration">Expiration Date: {item.expirationDate}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
