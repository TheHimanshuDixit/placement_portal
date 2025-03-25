import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "tailwindcss/tailwind.css";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const MyAttendance = () => {
  const [companies, setCompanies] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch(`${process.env.REACT_APP_DEV_URI}/api/student`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const fetchedCompanies = data.data.map((item, index) => ({
            id: (index + 1).toString(),
            name: item.company.name,
          }));

          const fetchedAttendanceData = data.data.reduce((acc, item) => {
            const companyName = item.company.name;
            acc[companyName] = item.event.map((e) => ({
              event: e.event,
              date: new Date(e.date).toLocaleDateString("en-GB")+" "+new Date(e.date).toLocaleTimeString("en-GB"),
              status: "Present",
            }));
            console.log(acc);
            return acc;
          }, {});

          fetchedCompanies.forEach((company) => {
            if (!fetchedAttendanceData[company.name]) {
              fetchedAttendanceData[company.name] = [];
            }
          });

          setCompanies(fetchedCompanies);
          setAttendanceData(fetchedAttendanceData);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      toast.error("You need to login first!");
      navigate("/login");
    }
    toast.promise(fetchData(), {
      loading: "Loading...",
      success: "Data fetched successfully",
      error: "Failed to fetch data",
    });
    // eslint-disable-next-line
  }, []);

  const openModal = (company) => {
    setSelectedCompany(company);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setModalIsOpen(false);
  };

  const renderAttendanceTable = () => {
    const data = attendanceData[selectedCompany] || [];
    return (
      <table className="w-full text-center border border-gray-300 mt-4 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <tr className="grid grid-cols-3">
            <th className="py-3 px-4">Event</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white even:bg-gray-100 grid grid-cols-3 w-full">
              <td className="py-3 px-4 flex items-center justify-center gap-2">
                <FaBuilding className="text-blue-500" /> {item.event}
              </td>
              <td className="py-3 px-4 flex flex-col justify-center gap-2">
                <div className="flex justify-center items-center gap-2">
                  <FaCalendarAlt className="text-gray-600" />{" "}
                  {item.date.split(" ")[0]}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FaClock className="text-gray-600" />{" "}
                  {item.date.split(" ")[1]}
                </div>
              </td>
              <td className="py-3 px-4 flex items-center justify-center gap-2">
                {item.status === "Present" ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 h-screen">
      <Toaster />
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Placement Attendance
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {companies.map((company) => (
          <button
            key={company.id}
            className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all"
            onClick={() => openModal(company.name)}>
            {company.name}
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-2xl outline-none animate-fadeIn"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {selectedCompany}
        </h2>
        {renderAttendanceTable()}
        <button
          onClick={closeModal}
          className="mt-6 py-3 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all w-full">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MyAttendance;
