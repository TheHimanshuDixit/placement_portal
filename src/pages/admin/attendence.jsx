import React, { useEffect, useState } from "react";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FaCheck, FaTimes, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const Attendance = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [placementEvents, setPlacementEvents] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  const handleAttendanceToggle = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

  const handleSubmit = async () => {
    const attendanceData = Object.keys(attendance).filter(
      (student) => attendance[student]
    );
    if (!event) {
      toast.error("Please select an event to mark attendance");
      return;
    }

    const data = {
      company: company.value,
      event: event.label,
      date: date.toISOString(),
      studentList: attendanceData,
    };
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
    const result = await fetch(`${process.env.REACT_APP_DEV_URI}/api/student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (result.success === "success") {
      toast.success("Attendance marked successfully");
      setAttendance({});
      setEvent(null);
      setCompany(null);
    } else {
      toast.error(result.error || "Failed to mark attendance");
    }
  };

  const handleSelectChange = async (selectedOption) => {
    setCompany(selectedOption);
    const ongoingEvents = allCompanies.find(
      (c) => c._id === selectedOption.value
    );
    const reqEvents = [];
    if (ongoingEvents.ppt !== "To be announced")
      reqEvents.push({ value: "ppt", label: "PPT" });
    if (ongoingEvents.test !== "To be announced")
      reqEvents.push({ value: "oa", label: "Online Assessment (OA)" });
    if (ongoingEvents.interview !== "To be announced")
      reqEvents.push({ value: "interview", label: "Interview" });
    setPlacementEvents(reqEvents);

    const data = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/application/get/${selectedOption.value}`
    );
    const RS = await data.json();
    setRegisteredStudents(
      RS.data.map((student) => ({ id: student.email, name: student.name }))
    );
  };

  const handleFetch = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/opening/getall`
    );
    const openings = await data.json();
    const ongoingEvents = openings.data.filter(
      (opening) => opening.progress === "Ongoing"
    );
    setAllCompanies(ongoingEvents);
    setCompanies(
      ongoingEvents.map((event) => ({
        value: event._id,
        label: `${event.name} - ${event.jobId}`,
      }))
    );
  };
  useEffect(() => {
    toast.promise(handleFetch(), {
      loading: "Fetching data...",
      success: "Data fetched successfully",
      error: "Failed to fetch, please try again",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!event || !company) return;
    const temp = allCompanies.find((c) => c._id === company.value);
    if (event.value === "ppt") setDate(new Date(temp.ppt));
    else if (event.value === "oa") setDate(new Date(temp.test));
    else if (event.value === "interview") setDate(new Date(temp.interview));
  }, [event, company, allCompanies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-8 flex flex-col items-center">
      <Toaster />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center gap-2">
        <FaUsers className="text-blue-500" /> Mark Attendance for Placement
        Drive
      </motion.h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        onClick={() => navigate("/view-attendance")}>
        View Attendance Records
      </button>
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg mt-6">
        <div className="mb-6">
          <label
            htmlFor="company-select"
            className="block text-gray-700 text-lg font-bold mb-2">
            Select Placement Drive Company
          </label>
          <Select
            id="company-select"
            options={companies}
            value={company}
            onChange={handleSelectChange}
            className="w-full"
            placeholder="Choose company..."
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="event-select"
            className="block text-gray-700 text-lg font-bold mb-2">
            Select Ongoing Drive Event
          </label>
          <Select
            id="event-select"
            options={placementEvents}
            value={event}
            onChange={setEvent}
            className="w-full"
            placeholder="Choose event..."
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="date-select"
            className="block text-gray-700 text-lg font-bold mb-2">
            Select Date
          </label>
          <DateTimePicker
            id="date-select"
            value={date}
            onChange={setDate}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mt-6">
          <label
            htmlFor="student-select"
            className="block text-gray-700 text-lg font-bold mb-4">
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
                      <FaCheck /> Present
                    </>
                  ) : (
                    <>
                      <FaTimes /> Absent
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
        {registeredStudents.length > 0 && (
          <button
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
            onClick={handleSubmit}>
            Submit Attendance
          </button>
        )}
      </div>
    </div>
  );
};

export default Attendance;
