import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffForm from "./components/StaffForm";
import StaffDetails from "./components/StaffDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaffDetails />} />
        <Route path="/add-staff" element={<StaffForm />} />
      </Routes>
    </Router>
  );
};

export default App;
