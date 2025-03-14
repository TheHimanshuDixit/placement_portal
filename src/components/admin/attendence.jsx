import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import GlowingLoader from "../loader";

const Attendance = () => {
  const [event, setEvent] = useState(null);
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const placementEvents = [
    { value: "ppt", label: "PPT" },
    { value: "oa", label: "Online Assessment (OA)" },
    { value: "interview", label: "Interview" },
  ];

  const handleAttendanceToggle = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

  const handleSubmit = async () => {
    const attendanceData = [];
    for (let student in attendance) {
      if (attendance[student] === true) attendanceData.push(student);
    }
    // console.log(date.toISOString());

    const data = {
      company: company.value,
      event: event.label,
      date: date.toISOString(),
      studentList: attendanceData,
    };
    // console.log(data);
    setLoading(true);
    const result = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/student`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    if (result.message === "success") {
      alert("Attendance marked successfully");
      setAttendance({});
      setEvent(null);
      setCompany(null);
    } else {
      alert("Failed to mark attendance");
    }
    setLoading(false);
  };

  const handleSelectChange = async (selectedOption) => {
    setCompany(selectedOption);
    setLoading(true);
    const data = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/application/get/${selectedOption.value}`
    );
    const RS = await data.json();
    const reqRS = [];
    for (let i = 0; i < RS.data.length; i++) {
      reqRS.push({ id: RS.data[i].email, name: RS.data[i].name });
    }
    setRegisteredStudents(reqRS);
    setLoading(false);
  };

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const data = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/opening/getall`
      );
      const openings = await data.json();
      const allOngoingEvents = openings.data.filter(
        (opening) => opening.progress === "Ongoing"
      );
      let res = [];
      allOngoingEvents.forEach((event) => {
        res.push({ value: event._id, label: event.name });
      });
      setCompanies(res);
      setLoading(false);
    };
    handleFetch();
  }, []);

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mark Attendance for Placement Drive
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Select Placement Drive Company
          </label>
          <Select
            options={companies}
            value={company}
            onChange={handleSelectChange}
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
          {registeredStudents.length > 0 ? (
            registeredStudents.map((student) => (
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
            ))
          ) : (
            <div className="text-center text-gray-800">
              No students registered for this drive
            </div>
          )}
        </div>

        {/* Submit Button */}
        {registeredStudents.length > 0 && (
          <button
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mx-auto block text-lg font-bold"
            onClick={handleSubmit}>
            Submit Attendance
          </button>
        )}
      </div>
    </div>
  );
};

export default Attendance;
