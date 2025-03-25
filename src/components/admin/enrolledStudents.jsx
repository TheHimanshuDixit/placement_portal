import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaKey } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/college/get`
      );
      const data = await response.json();
      if (data?.data) {
        const sortedStudents = data.data.sort((a, b) =>
          a.enroll.localeCompare(b.enroll)
        );
        setStudents(sortedStudents);
      }
    } catch (err) {
      toast.error("Failed to fetch students. Please try again later.");
      setError("Failed to fetch students. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    toast.promise(fetchStudents(), {
      loading: "Loading students...",
      success: "Students loaded successfully.",
      error: "Failed to fetch students. Please try again later.",
    });
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 flex items-center gap-2 text-lg">
          <FiRefreshCw className="animate-spin text-blue-500" /> Loading
          students...
        </motion.div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    return (
      <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-xl shadow-xl overflow-x-auto">
        <Toaster />
        <table className="w-full border-collapse rounded-xl shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white text-lg">
              <th className="border px-6 py-3 text-center w-1/2">
                <div className="flex items-center justify-center gap-2">
                  <FaUserGraduate /> Enrollment No.
                </div>
              </th>
              <th className="border px-6 py-3 text-center w-1/2">
                <div className="flex items-center justify-center gap-2">
                  <FaKey /> Password
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const rowClass = index % 2 === 0 ? "bg-blue-50" : "bg-white";
              return (
                <tr
                  key={student.enroll}
                  className={`border ${rowClass} hover:bg-blue-100 transition`}>
                  <td className="border px-6 py-3 text-center font-semibold text-gray-700">
                    {student.enroll}
                  </td>
                  <td className="border px-6 py-3 text-center font-mono text-gray-600">
                    {student.pwd}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center gap-2">
        <FaUserGraduate className="text-blue-500" /> Enrolled Students
      </motion.h1>
      {renderContent()}
    </div>
  );
};

export default StudentList;
