import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetailsPage from './component/user/userDetails/userDetails';
import Signin from './pages/Signin';

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
