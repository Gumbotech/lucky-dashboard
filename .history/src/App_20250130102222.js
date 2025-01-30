import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/signin';
import Dashboard from './pages/dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Dashboard />} />  
      </Routes>
    </Router>
  );
}

export default App;
