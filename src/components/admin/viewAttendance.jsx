import React, { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

const ViewAttendance = () => {
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/opening/getall`
      );
      const data = await response.json();
      const allCompanies = data.data.map((event) => ({
        value: event._id,
        label: `${event.name} - ${event.jobId}`,
      }));
      setCompanies(allCompanies);
    } catch (error) {
      toast.error("Failed to fetch companies");
      console.error("Failed to fetch companies", error);
    }
  };
  useEffect(() => {
    toast.promise(fetchCompanies(), {
      loading: "Loading companies...",
      success: "Companies loaded successfully.",
      error: "Failed to fetch companies. Please try again later.",
    });
  }, []);

  const handleSelectChange = async (selectedOption) => {
    setCompany(selectedOption);
    setLoading(true);
    toast.success("Please wait...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#333",
      },
    });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/student/${selectedOption.value}`
      );
      const data = await response.json();
      setAttendanceData(data.data || []);
    } catch (error) {
      console.error("Failed to fetch attendance data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 flex flex-col items-center">
      <Toaster />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center gap-2">
        <FaClipboardList className="text-blue-500" /> View Attendance Records
      </motion.h1>

      <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-xl shadow-xl">
        <Select
          options={companies}
          value={company}
          onChange={handleSelectChange}
          className="mb-4"
          placeholder="Select Company..."
        />

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg flex items-center justify-center gap-2">
            <FiRefreshCw className="animate-spin text-blue-500" /> Loading
            attendance records...
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md">
              <thead className="bg-blue-500 text-white text-lg sticky top-0">
                <tr>
                  <th className="border px-6 py-3 text-center">Sr No</th>
                  <th className="border px-6 py-3 text-center">Name</th>
                  <th className="border px-6 py-3 text-center">Event</th>
                  <th className="border px-6 py-3 text-center">Date</th>
                  <th className="border px-6 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.length > 0 ? (
                  attendanceData.map((item, index) => {
                    const rowClass =
                      index % 2 === 0 ? "bg-blue-50" : "bg-white";
                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`border ${rowClass} hover:bg-blue-100 transition`}>
                        <td className="border px-6 py-3 text-center">
                          {index + 1}
                        </td>
                        <td className="border px-6 py-3 text-center flex items-center justify-center gap-2">
                          <FaUser className="text-blue-500" /> {item.name}
                        </td>
                        <td className="border px-6 py-3 text-center">
                          {item.event.event}
                        </td>
                        <td className="border px-6 py-3 text-center flex items-center justify-center gap-2">
                          <FaCalendarAlt className="text-yellow-500" />{" "}
                          {item.event.date.split("T")[0]}{" "}
                          {item.event.date.split("T")[1]
                            ? item.event.date.split("T")[1].split(".")[0]
                            : ""}
                        </td>
                        <td className="border px-6 py-3 text-center font-bold text-green-600">
                          {item.event.status === "Present" ? (
                            <FaCheckCircle className="text-green-500 inline-block" />
                          ) : (
                            <FaTimesCircle className="text-red-500 inline-block" />
                          )}
                          {item.event.status}
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
