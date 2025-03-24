import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaDiscord,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="md:flex md:justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="./Images/logo.png"
                className="mr-3 h-10"
                alt="T&P Portal Logo"
              />
              <span className="text-2xl font-bold">T&P Portal</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
            <div>
              <h2 className="mb-4 font-semibold">Resources</h2>
              <ul>
                <li className="mb-2 hover:underline">
                  <Link to="/">T&P Portal</Link>
                </li>
                <li className="hover:underline">
                  <Link to="https://tailwindcss.com/">Tailwind CSS</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-semibold">Follow Us</h2>
              <ul>
                <li className="mb-2 hover:underline">
                  <Link to="https://github.com/TheHimanshuDixit/placement_portal">
                    GitHub
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to="#">Discord</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-semibold">Legal</h2>
              <ul>
                <li className="mb-2 hover:underline">
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li className="hover:underline">
                  <Link to="#">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm">
            © 2025{" "}
            <Link to="/" className="hover:underline">
              T&P Portal
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex space-x-5 mt-4 sm:mt-0">
            <Link to="#" className="hover:scale-110 transition-transform">
              <FaFacebook className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:scale-110 transition-transform">
              <FaTwitter className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:scale-110 transition-transform">
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:scale-110 transition-transform">
              <FaDiscord className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:scale-110 transition-transform">
              <FaLinkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
