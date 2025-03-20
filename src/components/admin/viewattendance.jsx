import React, { useState, useEffect } from "react";
import Select from "react-select";

const ViewAttendance = () => {
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/opening/getall`
      );
      const data = await response.json();
      const allCompanies = data.data.map((event) => ({
        value: event._id,
        label: event.name+" - "+event.jobId,
      }));
      setCompanies(allCompanies);
    };
    fetchCompanies();
  }, []);

  const handleSelectChange = async (selectedOption) => {
    setCompany(selectedOption);
    const response = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/student/${selectedOption.value}`
    );
    const data = await response.json();
    console.log(data);
    setAttendanceData(data.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        View Attendance Records
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Select
          options={companies}
          value={company}
          onChange={handleSelectChange}
          className="mb-4"
          placeholder="Select Company..."
        />

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Sr No</th>
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Event</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData && attendanceData.length > 0 ? (
              attendanceData.map((item, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.event.event}</td>
                  <td className="border px-4 py-2">{item.event.date}</td>
                  <td className="border px-4 py-2">{item.event.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttendance;
