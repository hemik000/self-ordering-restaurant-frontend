import React from "react";

function Footer() {
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://www.creative-tim.com"
                className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
              >
                Creative Tim
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
