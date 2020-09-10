import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Base({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Base;
