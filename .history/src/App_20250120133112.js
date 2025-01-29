import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import UserDetailsPage from './component/User/user_details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/home/:userId" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
