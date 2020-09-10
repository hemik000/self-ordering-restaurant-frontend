import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function Base({ className, children }) {
  return (
    <div>
      <Navbar transparent />
      <main className="profile-page">
        <Hero />

        <div className={className}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Base;
