import AppRoutes from "./routes";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-500 text-white">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between py-3">
          <Link to="/" className="text-xl font-bold">
            HOME
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.364 5.636a1 1 0 010 1.414L13.414 12l4.95 4.95a1 1 0 01-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.414-1.414L10.586 12 5.636 7.05a1 1 0 011.414-1.414L12 10.586l4.95-4.95a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>

          <div
            className={`w-full lg:flex lg:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbarSupportedContent"
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-3 lg:mt-0">
              <li>
                <a
                  href="https://github.com/anggakrnwn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded hover:bg-gray-700"
                >
                  anggakrnwn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 mt-5">
        <AppRoutes />
      </div>
    </div>
  );
}
