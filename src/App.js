import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Framework from './components/Framework';
import EncryptDecrypt from './components/EncryptDecrypt'; // Import the EncryptDecrypt component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/framework" element={<Framework />} />
          <Route path="/encrypt-decrypt" element={<EncryptDecrypt />} /> {/* Add route for EncryptDecrypt */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
