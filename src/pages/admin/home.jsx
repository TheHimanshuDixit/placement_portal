import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="bg-gradient-to-b from-blue-50 to-gray-100 container py-3 mx-auto md:px-6">
        <section className="mb-32">
          <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://www.jiit.ac.in/sites/default/files/5_0.jpg')] h-[500px]"></div>
          <div className="container mx-auto px-6 md:px-12 xl:px-32">
            <div className="text-center">
              <div className="mt-[-170px] block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:py-16 md:px-12">
                <h1 className="mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                  Welcome to JIIT <br />
                  <span className="text-blue-600 dark:text-blue-400">
                    Placement Portal
                  </span>
                </h1>
                <Link
                  className="mb-2 inline-block rounded bg-blue-600 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] md:mr-2 md:mb-0"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("authAdminToken");
                  }}>
                  Admin Login
                </Link>
                <Link
                  className="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-blue-600 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-0 active:text-blue-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-40"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  to="/addadmin">
                  Add Admin
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
