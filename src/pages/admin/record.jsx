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
import GlowingLoader from "../../components/loader";

const Record = () => {
  // Data for both charts
  // const data = [
  //   { year: "2019", placed: 85, companies: 50 },
  //   { year: "2020", placed: 90, companies: 60 },
  //   { year: "2021", placed: 88, companies: 65 },
  //   { year: "2022", placed: 92, companies: 70 },
  //   { year: "2023", placed: 95, companies: 80 },
  // ];
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_DEV_URI}/api/demographicData`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        console.log(d);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
        Placement Statistics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Line Chart - Left Side */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
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
        </div>

        {/* Bar Chart - Right Side */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
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
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default Record;
