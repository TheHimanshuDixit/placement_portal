import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("admin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveNavItem(() => {
      switch (window.location.pathname) {
        case "/admin":
          return "admin";
        case "/addadmin":
          return "addadmin";
        case "/addopening":
          return "addopening";
        case "/studdetails":
          return "studdetails";
        case "/attendance":
          return "attendance";
        case "/record":
          return "record";
        default:
          return "";
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authAdminToken");
    window.location.href = "/login";
  };

  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-md dark:bg-neutral-700 lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* Hamburger button for mobile */}
        <button
          className="lg:hidden px-2 text-black/50 dark:text-neutral-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation">
          <svg className="w-7" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Navbar Content */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-grow basis-[100%] lg:flex lg:basis-auto`}>
          {/* Logo */}
          <Link
            to="/admin"
            className="flex items-center text-neutral-900 dark:text-neutral-200">
            <img
              src="./Images/logo.png"
              alt="Logo"
              className="mr-3 h-6 sm:h-9"
            />
            <span className="text-xl font-semibold">JIIT:T&P Portal</span>
          </Link>

          {/* Navigation Links */}
          <ul className="list-none me-auto flex flex-col lg:flex-row">
            {[
              { name: "Home", path: "/admin", key: "admin" },
              { name: "T&P Team", path: "/addadmin", key: "addadmin" },
              {
                name: "Internships/Jobs",
                path: "/addopening",
                key: "addopening",
              },
              {
                name: "Students Details",
                path: "/studdetails",
                key: "studdetails",
              },
              { name: "Attendance", path: "/attendance", key: "attendance" },
              { name: "Statistics", path: "/record", key: "record" },
            ].map((item) => (
              <li key={item.key} className="lg:pe-2">
                <Link
                  to={item.path}
                  onClick={() => setActiveNavItem(item.key)}
                  className={`block py-2 px-3 transition ${
                    activeNavItem === item.key
                      ? "text-blue-500"
                      : "text-gray-700 hover:text-black"
                  } dark:text-white/60 dark:hover:text-white/80`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile & Logout */}
        {localStorage.getItem("authAdminToken") && (
          <div className="relative flex items-center">
            <CgProfile
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-3xl text-primary-700 cursor-pointer"
            />
            {isProfileOpen && (
              <div className="absolute top-9 right-0 w-32 p-2 bg-white shadow-md rounded-md dark:bg-gray-800">
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
