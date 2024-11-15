import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [click, setClick] = useState("/");
  const [onProfile, setOnProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleClick = (path) => {
    setClick(path);
  };

  useEffect(() => {
    initFlowbite();
    handleClick(window.location.pathname);
  }, []);

  return (
    <>
      <header>
        <nav className="px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b-2 shadow-md">
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
              {!localStorage.getItem("authToken") && (
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Log in
                </Link>
              )}
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
                      <Link to="/myattendence">My Attendance</Link>
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
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "T&P Team", path: "/team" },
                  { name: "Internships/Jobs", path: "/openings" },
                  { name: "Contribute", path: "/contribute" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => handleClick(item.path)}
                      className={`${
                        click === item.path ? "text-blue-700" : "text-gray-700"
                      } block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
