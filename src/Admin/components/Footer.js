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
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
              <li>
                <a
                  href="https://www.creative-tim.com"
                  className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                >
                  Creative Tim
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/presentation"
                  className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="http://blog.creative-tim.com"
                  className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/creativetimofficial/tailwind-starter-kit/blob/master/LICENSE.md"
                  className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
