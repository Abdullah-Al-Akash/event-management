import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Events", path: "/events" },
    { name: "Add Event", path: "/add-event" },
    { name: "My Event", path: "/my-events" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo & Site Name */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            setMobileMenuOpen(false);
            navigate("/home");
          }}
        >
          <span className="text-3xl" role="img" aria-label="leaf">
            🍃
          </span>
          <h1 className="text-xl font-extrabold text-brandGreen select-none">
            Natural Event
          </h1>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6 font-semibold text-gray-700">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-brandGreen border-b-2 border-brandGreen pb-1"
                  : "hover:text-brandGreen transition"
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Right side - desktop */}
        <div className="hidden md:block relative">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="btn bg-brandGreen hover:bg-[#276749] border-0 text-white"
            >
              Sign In
            </button>
          ) : (
            <div ref={dropdownRef} className="relative">
              <motion.img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-brandGreen"
                onClick={() => setDropdownOpen((open) => !open)}
                whileTap={{ scale: 0.95 }}
              />
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                  >
                    <div className="px-4 py-2 text-gray-700 font-semibold cursor-default select-none">
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Hamburger button - mobile */}
        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            // Close icon
            <svg
              className="w-8 h-8 text-brandGreen"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-8 h-8 text-brandGreen"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md overflow-hidden border-t border-gray-200"
          >
            <nav className="flex flex-col space-y-1 px-6 py-4 font-semibold text-gray-700">
              {navLinks.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-brandGreen border-l-4 border-brandGreen pl-3 py-2"
                      : "hover:text-brandGreen transition px-3 py-2"
                  }
                >
                  {name}
                </NavLink>
              ))}

              {/* Auth button */}
              {!user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="mt-4 bg-brandGreen text-white font-semibold rounded-md py-2 hover:bg-[#276749] transition"
                >
                  Sign In
                </button>
              ) : (
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-brandGreen"
                    />
                    <span className="font-semibold text-gray-700 select-none">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="mt-3 w-full text-left text-red-600 font-semibold hover:bg-red-100 rounded-md px-3 py-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
