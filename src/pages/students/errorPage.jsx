import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center min-h-screen text-white">
      <div className="py-8 px-4 mx-auto max-w-screen-md text-center animate-fadeIn">
        <h1 className="mb-4 text-9xl font-extrabold tracking-tight">404</h1>
        <p className="mb-4 text-3xl font-bold">Oops! Page Not Found.</p>
        <p className="mb-6 text-lg font-light">
          The page you're looking for doesn't exist. It may have been moved or
          deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lg bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
          <FaHome className="text-xl" /> Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
