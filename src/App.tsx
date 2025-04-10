
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReposPage from "./pages/ReposPage"; 
// import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos/:username" element={<ReposPage />} />
      <Route
        path="*"
        element={<div className="p-4 text-red-500">404 - Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;

