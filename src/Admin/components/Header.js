import React from "react";
import CardStats from "./CardStats";

function Header({ children }) {
  return (
    <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        {/* Card Stats */}
        {children}
      </div>
    </div>
  );
}

export default Header;
