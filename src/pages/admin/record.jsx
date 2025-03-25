import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Dashboard from "../../components/admin/dashboard";
import { motion } from "framer-motion";
import { FaChartLine, FaBuilding } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Record = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    toast.promise(
      fetch(`${process.env.REACT_APP_DEV_URI}/api/demographicData`)
        .then((res) => res.json())
        .then((d) => {
          setData(d);
          console.log(d);
        })
        .catch((err) => {
          console.error(err);
        }),
      {
        loading: "Loading data...",
        success: "Data loaded successfully",
        error: "Failed to load data",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-10">
    <Toaster />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-700 mb-8 flex items-center justify-center gap-3">
        <FaChartLine className="text-blue-600" />
        Placement Statistics Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
            <FaChartLine className="text-blue-600" />
            Year-wise Placement Percentage
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="placed"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
            <FaBuilding className="text-green-600" />
            Year-wise Number of Companies Visiting
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="companies" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}>
        <Dashboard />
      </motion.div>
    </div>
  );
};

export default Record;
