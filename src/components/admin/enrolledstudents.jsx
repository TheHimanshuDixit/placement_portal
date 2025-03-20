import React, { useEffect, useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DEV_URI}/api/college/get`
        );
        const data = await response.json();

        // Sorting by Enrollment No. (Assuming enroll number is a field in data)
        const sortedStudents = data.data.sort((a, b) =>
          a.enroll.localeCompare(b.enroll)
        );

        setStudents(sortedStudents);
      } catch (err) {
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Enrolled Students</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading students...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Enrollment No.</th>
                <th className="border px-4 py-2">Password</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{student.enroll}</td>
                  <td className="border px-4 py-2">{student.pwd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
