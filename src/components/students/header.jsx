import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaUsers,
  FaPhone,
  FaClipboardList,
  FaHandsHelping,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const Header = () => {
  const [activePage, setActivePage] = useState("/");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md dark:bg-gray-900 z-50 border-b dark:border-gray-800">
      <Toaster />
      <div className="flex items-center justify-between px-6 py-4 border-b-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-gray-900 dark:text-white">
          <img src="./Images/logo.png" alt="Logo" className="mr-3 h-8" />
          <span className="text-xl font-semibold">JIIT:T&P Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6">
          {[
            { name: "Home", path: "/", icon: <FaHome /> },
            { name: "About", path: "/about", icon: <FaInfoCircle /> },
            { name: "T&P Team", path: "/team", icon: <FaUsers /> },
            {
              name: "Internships/Jobs",
              path: "/openings",
              icon: <FaBriefcase />,
            },
            {
              name: "Attendance",
              path: "/myattendance",
              icon: <FaClipboardList />,
            },
            {
              name: "Contribute",
              path: "/contribute",
              icon: <FaHandsHelping />,
            },
            { name: "Contact", path: "/contact", icon: <FaPhone /> },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setActivePage(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                activePage === item.path
                  ? "text-blue-500 bg-gray-200 dark:bg-gray-700"
                  : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
              {item.icon} {item.name}
            </Link>
          ))}
        </div>

        {/* Profile & Mobile Menu */}
        <div className="flex items-center gap-4">
          {localStorage.getItem("authToken") ? (
            <CgProfile
              onMouseOver={() => setIsProfileOpen(true)}
              onMouseOut={() => setIsProfileOpen(false)}
              className="text-3xl text-blue-600 cursor-pointer hover:scale-110 transition-all"
            />
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 transition">
              Log in
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-900 dark:text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white dark:bg-gray-900 pb-4 shadow-md transition-all animate-slideInDown">
          {[
            { name: "Home", path: "/", icon: <FaHome /> },
            { name: "About", path: "/about", icon: <FaInfoCircle /> },
            { name: "T&P Team", path: "/team", icon: <FaUsers /> },
            {
              name: "Internships/Jobs",
              path: "/openings",
              icon: <FaBriefcase />,
            },
            {
              name: "Attendance",
              path: "/myattendance",
              icon: <FaClipboardList />,
            },
            {
              name: "Contribute",
              path: "/contribute",
              icon: <FaHandsHelping />,
            },
            { name: "Contact", path: "/contact", icon: <FaPhone /> },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="border-b-2 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-center flex justify-center items-center gap-2">
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div
          className="z-10 absolute right-3 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn"
          onMouseOver={() => setIsProfileOpen(true)}
          onFocus={() => setIsProfileOpen(true)}
          onMouseOut={() => setIsProfileOpen(false)}
          onBlur={() => setIsProfileOpen(false)}
          role="menu"
          tabIndex={0}>
          <ul>
            {[
              "My Profile",
              "My Applications",
              "My Attendance",
              "My Contributions",
            ].map((item) => (
              <li
                key={item}
                className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <Link to={`/${item.toLowerCase().replace(/ /g, "")}`}>
                  {item}
                </Link>
              </li>
            ))}
            <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
