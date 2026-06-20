import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-blue-50 text-3xl font-bold text-blue-900">Welcome to CPMS (Day 1 Setup)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;