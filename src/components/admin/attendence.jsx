import React, { useEffect, useState } from "react";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import GlowingLoader from "../loader";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placementEvents, setPlacementEvents] = useState([]);
  const [allcompanies, setAllCompanies] = useState([]);

  // const placementEvents = [
  //   { value: "ppt", label: "PPT" },
  //   { value: "oa", label: "Online Assessment (OA)" },
  //   { value: "interview", label: "Interview" },
  // ];

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
    if (event === null) {
      alert("Attendance not marked. Please select event");
      return;
    }

    const data = {
      company: company.value,
      event: event.label,
      date: date.toISOString(),
      studentList: attendanceData,
    };
    setLoading(true);
    const result = await fetch(`${process.env.REACT_APP_DEV_URI}/api/student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

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
    const ongoingEvents = allcompanies.filter(
      (company) => company._id === selectedOption.value
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
    const reqRS = [];
    for (const student of RS.data) {
      reqRS.push({ id: student.email, name: student.name });
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
      setAllCompanies(allOngoingEvents);
      let res = [];
      allOngoingEvents.forEach((event) => {
        res.push({ value: event._id, label: event.name + " - " + event.jobId });
      });
      setCompanies(res);
      setLoading(false);
    };
    handleFetch();
  }, []);

  useEffect(() => {
    let temp = allcompanies.filter((c) => c._id === company.value);
    if (event && event.value === "ppt") {
      setDate(new Date(temp[0].ppt));
    } else if (event && event.value === "oa") {
      setDate(new Date(temp[0].test));
    } else if (event && event.value === "interview") {
      setDate(new Date(temp[0].interview));
    }
  }, [event]);

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mark Attendance for Placement Drive
      </h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => navigate("/view-attendance")}>
        View Attendance Records
      </button>

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
          {placementEvents.length && placementEvents.length > 0 ? (
            <Select
              options={placementEvents}
              value={event}
              onChange={setEvent}
              className="w-full"
              placeholder="Choose event..."
            />
          ) : (
            <div className="text-center text-gray-800">No events available</div>
          )}
        </div>

        {/* Select Date */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Select Date
          </label>
          <DateTimePicker
            value={date}
            onChange={(date) => setDate(date)}
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
