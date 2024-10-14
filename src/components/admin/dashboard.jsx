import React, { useState } from "react";
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

// Sample data for each year
const yearData = {
  2021: {
    statistics: {
      highest: 35,
      lowest: 4,
      median: 12,
      average: 15,
      topCompanies: [
        { name: "Google", offers: 10, package: 35 },
        { name: "Amazon", offers: 8, package: 30 },
        { name: "Microsoft", offers: 6, package: 28 },
      ],
    },
    placementData: {
      placed: 90,
      unplaced: 10,
      roles: [
        { name: "SDE", value: 60 },
        { name: "Data Analytics", value: 20 },
        { name: "Consultant", value: 10 },
        { name: "Other", value: 10 },
      ],
      monthWiseCompanies: [
        { month: "Jan", companies: 10 },
        { month: "Feb", companies: 12 },
        { month: "Mar", companies: 8 },
        { month: "Apr", companies: 15 },
        { month: "May", companies: 20 },
      ],
      companiesList: [
        {
          name: "Google",
          package: "35 LPA",
          placements: 10,
          visitDate: "2021-01-15",
        },
        {
          name: "Amazon",
          package: "30 LPA",
          placements: 8,
          visitDate: "2021-02-20",
        },
        {
          name: "Microsoft",
          package: "28 LPA",
          placements: 6,
          visitDate: "2021-03-10",
        },
      ],
    },
  },
  2022: {
    statistics: {
      highest: 40,
      lowest: 6,
      median: 14,
      average: 18,
      topCompanies: [
        { name: "Facebook", offers: 12, package: 40 },
        { name: "Netflix", offers: 7, package: 32 },
        { name: "Tesla", offers: 9, package: 30 },
      ],
    },
    placementData: {
      placed: 85,
      unplaced: 15,
      roles: [
        { name: "SDE", value: 65 },
        { name: "Data Analytics", value: 15 },
        { name: "Consultant", value: 15 },
        { name: "Other", value: 5 },
      ],
      monthWiseCompanies: [
        { month: "Jan", companies: 9 },
        { month: "Feb", companies: 10 },
        { month: "Mar", companies: 13 },
        { month: "Apr", companies: 14 },
        { month: "May", companies: 16 },
      ],
      companiesList: [
        {
          name: "Facebook",
          package: "40 LPA",
          placements: 12,
          visitDate: "2022-01-20",
        },
        {
          name: "Netflix",
          package: "32 LPA",
          placements: 7,
          visitDate: "2022-02-25",
        },
        {
          name: "Tesla",
          package: "30 LPA",
          placements: 9,
          visitDate: "2022-03-15",
        },
      ],
    },
  },
};

// Define color palette for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2021");
  const [showModal, setShowModal] = useState(false);
  const [modalCompanies, setModalCompanies] = useState([]); // New state for companies to display in modal
  const data = yearData[selectedYear];

  const years = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  // Function to open modal with the selected year's companies
  const handleOpenModal = () => {
    setModalCompanies(data.placementData.companiesList); // Set companies based on selected year
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
        Select Year
      </h1>

      {/* Year Selection */}
      <div className="max-w-md mx-auto mb-8">
        <Select
          options={years}
          value={{ value: selectedYear, label: selectedYear }}
          onChange={(option) => setSelectedYear(option.value)}
          className="w-full"
        />
      </div>

      {/* Displaying Statistics */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Statistics for {selectedYear}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Package Overview
            </h3>
            <p className="flex justify-between mb-2">
              <strong>Highest Package:</strong>
              <span className="text-green-600 font-bold">
                {data.statistics.highest} LPA
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <strong>Lowest Package:</strong>
              <span className="text-red-600 font-bold">
                {data.statistics.lowest} LPA
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <strong>Median Package:</strong>
              <span className="text-blue-600 font-bold">
                {data.statistics.median} LPA
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <strong>Average Package:</strong>
              <span className="text-gray-800 font-bold">
                {data.statistics.average} LPA
              </span>
            </p>
          </div>
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Top Companies
            </h3>
            <ul className="space-y-3">
              {data.statistics.topCompanies.map((company, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 rounded-lg p-3 transition-all duration-200 hover:bg-gray-200">
                  <span className="font-medium text-gray-800">
                    {company.name}
                  </span>
                  <span className="text-green-600 font-bold">
                    {company.package} LPA
                  </span>
                  <span className="text-gray-600">{company.offers} offers</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pie Charts and Line Chart Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pie Chart - Placed vs Unplaced */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
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
        </div>

        {/* Pie Chart - Roles Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
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
        </div>

        {/* Line Chart - Month Wise Company Visits */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
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
        </div>
      </div>

      {/* Button to Open Modal with Selected Year Companies */}
      <div className="mt-10 text-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg transition-all duration-200 hover:bg-blue-600"
          onClick={handleOpenModal}>
          View Companies for {selectedYear}
        </button>
      </div>

      {/* Modal to Display Selected Year Companies List */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Companies List for {selectedYear}
            </h2>
            <ul className="space-y-3">
              {modalCompanies.map((company, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 rounded-lg p-3">
                  <span className="font-medium text-gray-800">
                    {company.name}
                  </span>
                  <span className="text-green-600 font-bold">
                    {company.package}
                  </span>
                  <span className="text-gray-600">
                    {company.placements} students
                  </span>
                  <span className="text-gray-600">{company.visitDate}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg transition-all duration-200 hover:bg-red-600"
                onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
