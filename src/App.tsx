import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./layouts/Navbar";

// Pages
import Home from "./pages/Home";
// import Courts from "./pages/Court";
import Bookings from "./pages/Booking";
import Admin from "./pages/Admin";
import StaffDashboard from "./pages/Court";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<StaffDashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
