import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const Attendance = () => {
  const [event, setEvent] = useState(null);
  const [company, setCompany] = useState(null);
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  // Placement events
  const placementEvents = [
    { value: "ppt", label: "PPT" },
    { value: "oa", label: "Online Assessment (OA)" },
    { value: "interview", label: "Interview" },
  ];

  // List of companies for placement drives
  const companies = [
    { value: "google", label: "Google" },
    { value: "microsoft", label: "Microsoft" },
    { value: "amazon", label: "Amazon" },
    { value: "apple", label: "Apple" },
  ];

  const registeredStudents = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
  ];

  const handleAttendanceToggle = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

  const handleSubmit = () => {
    // Handle the submission logic (e.g., API call)
    console.log("Company:", company);
    console.log("Event:", event);
    console.log("Date:", date);
    console.log("Attendance marked:", attendance);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mark Attendance for Placement Drive
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Select Ongoing Placement Drive Company */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Select Placement Drive Company
          </label>
          <Select
            options={companies}
            value={company}
            onChange={setCompany}
            className="w-full"
            placeholder="Choose company..."
          />
        </div>

        {/* Select Ongoing Drive Event */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Select Ongoing Drive Event
          </label>
          <Select
            options={placementEvents}
            value={event}
            onChange={setEvent}
            className="w-full"
            placeholder="Choose event..."
          />
        </div>

        {/* Select Date */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Select Date
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Registered Students */}
        <div className="mt-6">
          <label className="block text-gray-700 text-lg font-bold mb-4">
            Registered Students
          </label>
          {registeredStudents.map((student) => (
            <div
              key={student.id}
              className="flex justify-between items-center border-b border-gray-200 py-3">
              <span className="text-gray-800">{student.name}</span>
              <button
                className={`${
                  attendance[student.id]
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-4 py-2 rounded-lg flex items-center gap-2`}
                onClick={() => handleAttendanceToggle(student.id)}>
                {attendance[student.id] ? (
                  <>
                    <FaCheck />
                    Present
                  </>
                ) : (
                  <>
                    <FaTimes />
                    Absent
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mx-auto block text-lg font-bold"
          onClick={handleSubmit}>
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
