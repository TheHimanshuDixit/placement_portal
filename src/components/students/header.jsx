import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [onProfile, setOnProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <>
      <header>
        <nav className=" px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b-2 shadow-md">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="./Images/logo.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                JIIT:T&P Portal
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              {!localStorage.getItem("authToken") && <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                Log in
              </Link>}
              {localStorage.getItem("authToken") && (
                <CgProfile
                  onMouseOver={() => {
                    setOnProfile(true);
                  }}
                  onMouseLeave={() => {
                    setOnProfile(false);
                  }}
                  className="text-3xl lg:text-3xl text-primary-700 hover:text-primary-800"
                />
              )}
              {onProfile && (
                <div
                  onMouseOver={() => {
                    setOnProfile(true);
                  }}
                  onMouseLeave={() => {
                    setOnProfile(false);
                  }}
                  className="absolute right-2 -top-1 mt-12 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-md z-50">
                  <ul>
                    <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Link to="/myprofile">My Profile</Link>
                    </li>
                    <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Link to="/myapplications">My Applications</Link>
                    </li>
                    <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Link to="/mycontributions">My Contributions</Link>
                    </li>
                    <li className="text-gray-800 dark:text-white py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Link to="#" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    T&P Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/openings"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Internships/Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contribute"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Contribute
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
