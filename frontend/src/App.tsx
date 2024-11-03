import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import HomePage from './pages/Home';
import Inventory from './pages/inventory'; // Ensure this is the correct case

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default App;


