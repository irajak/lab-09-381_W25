import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HousePricePredictor from './components/HousePricePredictor';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/predict" element={<HousePricePredictor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
