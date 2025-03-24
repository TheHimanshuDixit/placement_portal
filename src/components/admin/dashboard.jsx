import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Select from "react-select";
import GlowingLoader from "../loader";
import { motion } from "framer-motion";
import {
  FaChartPie,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaIndustry,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [yearData, setYearData] = useState({});
  const [selectedYear, setSelectedYear] = useState("Select one year");
  const [showModal, setShowModal] = useState(false);
  const [modalCompanies, setModalCompanies] = useState([]);
  const [years, setYears] = useState([
    { value: "Select one year", label: "Select one year" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_DEV_URI}/api/demographicData/dashboard`)
      .then((response) => response.json())
      .then((data) => {
        setYearData((prevData) => ({ ...prevData, ...data }));
        const uniqueYears = new Set([
          ...years.map((year) => year.value),
          ...Object.keys(data),
        ]);
        setYears(
          Array.from(uniqueYears).map((year) => ({
            value: year,
            label: year,
          }))
        );
      })
      .catch((error) => {
        toast.error( "Error fetching data!");
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  const data = yearData[selectedYear];

  const handleOpenModal = () => {
    setModalCompanies(data.placementData.companiesList);
    setShowModal(true);
    toast.success("Companies list fetched successfully!");
  };

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-10">
      <Toaster />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
        <FaChartPie className="text-blue-600" />
        Select Year
      </motion.h1>
      <div className="max-w-md mx-auto mb-8">
        <Select
          options={years}
          value={{ value: selectedYear, label: selectedYear }}
          onChange={(option) => setSelectedYear(option.value)}
          className="w-full"
          placeholder="Choose one year..."
        />
      </div>

      {selectedYear !== "Select one year" && data && (
        <div>
          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg mb-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
              <FaUsers className="text-green-600" />
              Statistics for {selectedYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-gray-700 space-y-2">
                <h3 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-2 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" /> Package
                  Overview
                </h3>
                <p className="flex justify-between">
                  <strong>Highest Package:</strong>
                  <span className="text-green-600 font-bold">
                    {data.statistics.highest} LPA
                  </span>
                </p>
                <p className="flex justify-between">
                  <strong>Lowest Package:</strong>
                  <span className="text-red-600 font-bold">
                    {data.statistics.lowest} LPA
                  </span>
                </p>
                <p className="flex justify-between">
                  <strong>Median Package:</strong>
                  <span className="text-blue-600 font-bold">
                    {data.statistics.median} LPA
                  </span>
                </p>
                <p className="flex justify-between">
                  <strong>Average Package:</strong>
                  <span className="text-gray-800 font-bold">
                    {data.statistics.average} LPA
                  </span>
                </p>
              </div>
              <div className="text-gray-700">
                <h3 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-2 flex items-center gap-2">
                  <FaBuilding className="text-green-600" />
                  Top Companies
                </h3>
                <ul className="space-y-3">
                  {data.statistics.topCompanies.map((company, index) => (
                    <motion.li
                      key={index}
                      className="flex justify-between bg-gray-100 rounded-lg p-3 transition-all duration-200 hover:bg-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <span className="font-medium text-gray-800">
                        {company.name}
                      </span>
                      <span className="text-green-600 font-bold">
                        {company.package} LPA
                      </span>
                      <span className="text-gray-600">
                        {company.offers} offers
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pie Chart - Placed vs Unplaced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h2 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
                <FaChartPie className="text-blue-600" />
                Placed vs Unplaced
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Placed", value: data.placementData.placed },
                      { name: "Unplaced", value: data.placementData.unplaced },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label>
                    <Cell key="Placed" fill="#00C49F" />
                    <Cell key="Unplaced" fill="#FF8042" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart - Roles Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h2 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
                <FaUsers className="text-blue-600" />
                Roles Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.placementData.roles}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label>
                    {data.placementData.roles.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Line Chart - Month-wise Company Visits */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h2 className="ext-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
                <FaIndustry className="text-blue-600" />
                Month-wise Company Visits
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.placementData.monthWiseCompanies}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="companies"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Modal Button */}
          <div className="mt-10 text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg transition-all duration-200 hover:bg-blue-600"
              onClick={handleOpenModal}>
              View Companies for {selectedYear}
            </button>
          </div>

          {/* Companies Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                  Companies List for {selectedYear}
                </h2>
                <ul className="space-y-3">
                  <li className="flex justify-between bg-gray-100 rounded-lg p-3">
                    <span className="font-medium text-gray-800 flex-1">
                      Company Name
                    </span>
                    <span className="text-green-600 font-bold flex-1 text-center">
                      Package (LPA)
                    </span>
                    <span className="text-gray-600 flex-1 text-center">
                      Placed Students (Offers)
                    </span>
                    <span className="text-gray-600 flex-1 text-right">
                      Visit Date
                    </span>
                  </li>
                  {modalCompanies.map((company, index) => (
                    <motion.li
                      key={index}
                      className="flex justify-between bg-gray-100 rounded-lg p-3 transition-all hover:bg-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <span className="font-medium text-gray-800 flex-1">
                        {company.name}
                      </span>
                      <span className="text-green-600 font-bold flex-1 text-center">
                        {company.package}
                      </span>
                      <span className="text-gray-600 flex-1 text-center">
                        {company.placements} students
                      </span>
                      <span className="text-gray-600 flex-1 text-right">
                        {company.visitDate}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 text-center">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg transition-all duration-200 hover:bg-red-600"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
