// Myattendence.js

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "tailwindcss/tailwind.css";
import GlowingLoader from "../../components/loader";

const Myattendence = () => {
  const [companies, setCompanies] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
              date: new Date(e.date).toLocaleDateString("en-GB"),
              status: "Present",
            }));
            return acc;
          }, {});

          fetchedCompanies.forEach((company) => {
            if (!fetchedAttendanceData[company.name]) {
              fetchedAttendanceData[company.name] = [];
            }
          });

          setCompanies(fetchedCompanies);
          setAttendanceData(fetchedAttendanceData);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchData();
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
      <table className="w-full text-center border border-gray-300 mt-4">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-2 px-4 border border-gray-300">Event</th>
            <th className="py-2 px-4 border border-gray-300">Date</th>
            <th className="py-2 px-4 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white even:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300">{item.event}</td>
              <td className="py-2 px-4 border border-gray-300">{item.date}</td>
              <td className="py-2 px-4 border border-gray-300">
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Placement Attendance
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {companies.map((company) => (
          <button
            key={company.id}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => openModal(company.name)}>
            {company.name}
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">
          {selectedCompany}
        </h2>
        {renderAttendanceTable()}
        <button
          onClick={closeModal}
          className="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Myattendence;
