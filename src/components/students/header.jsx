import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [activePage, setActivePage] = useState("/");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
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

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-neutral-900 dark:text-neutral-200">
          <img src="./Images/logo.png" alt="Logo" className="mr-3 h-6 sm:h-9" />
          <span className="text-xl font-semibold">JIIT:T&P Portal</span>
        </Link>

        {/* Navigation Links */}
        <div className={`${isMenuOpen ? "flex" : "hidden"} flex-grow lg:flex`}>
          <ul className="list-none me-auto flex flex-col lg:flex-row">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "T&P Team", path: "/team" },
              { name: "Internships/Jobs", path: "/openings" },
              { name: "Contribute", path: "/contribute" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.path} className="lg:pe-2">
                <Link
                  to={item.path}
                  onClick={() => setActivePage(item.path)}
                  className={`block py-2 px-3 transition ${
                    activePage === item.path
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
        <div className="relative flex items-center">
          {localStorage.getItem("authToken") ? (
            <CgProfile
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-3xl text-primary-700 cursor-pointer"
            />
          ) : (
            <Link
              to="/login"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              Log in
            </Link>
          )}

          {isProfileOpen && (
            <div className="absolute right-0 mt-12 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-md z-50">
              <ul>
                <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Link to="/myprofile">My Profile</Link>
                </li>
                <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Link to="/myapplications">My Applications</Link>
                </li>
                <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Link to="/myattendence">My Attendance</Link>
                </li>
                <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Link to="/mycontributions">My Contributions</Link>
                </li>
                <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
