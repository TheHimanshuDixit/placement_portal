import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-100 to-gray-100 text-gray-900 py-12 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-6 space-y-8">
        <nav className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Team", path: "/addadmin" },
            { name: "Internships/Jobs", path: "/addopenings" },
            { name: "Students Details", path: "/studdetails" },
          ].map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-xl">
              <Link
                to={item.path}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex justify-center space-x-6">
          {[
            { icon: <FaFacebookF />, link: "#" },
            { icon: <FaInstagram />, link: "#" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaGithub />, link: "#" },
            { icon: <FaDribbble />, link: "#" },
          ].map((social, index) => (
            <motion.a
              key={index}
              to={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-gray-600 hover:text-blue-500 text-2xl">
              {social.icon}
            </motion.a>
          ))}
        </div>

        <p className="mt-8 text-lg text-center text-gray-600">
          © {new Date().getFullYear()} JIIT:T&P Portal. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
