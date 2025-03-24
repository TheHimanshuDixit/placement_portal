import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { Modal, Ripple, Input, initTWE } from "tw-elements";
import { Link, useNavigate } from "react-router-dom";
import {
  FaExternalLinkAlt,
  FaUserCheck,
  FaFileExcel,
  FaLock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import GlowingLoader from "../../components/loader";
import { toast, Toaster } from "react-hot-toast";
const Studetails = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const [students, setStudents] = useState({
    enroll: "",
    pwd: "",
  });

  const [studList, setStudList] = useState([]);
  const [appList, setAppList] = useState([]);
  const [compList, setCompList] = useState([]);
  const [studData, setStudData] = useState([]);
  const [placed, setPlaced] = useState("No");
  const [pack, setPack] = useState(0);
  const [placedCompany, setPlacedCompany] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("authAdminToken")) {
      navigate("/login");
    }
    initTWE(
      { Modal, Ripple, Input },
      { allowReinits: true },
      { checkOtherImports: true }
    );

    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/application/getall`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      setAppList(data.data);
    };
    fetchData();

    const fetchCompData = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/opening/getall`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      setCompList(data.data);
    };
    fetchCompData();

    const fetchStudData = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_DEV_URI}/api/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      setStudList(data);
    };
    fetchStudData();
    // eslint-disable-next-line
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const { enroll, pwd } = students;
    if (!enroll || !pwd) {
      toast.error( "Please fill all the fields");
      return;
    }
    setLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/college/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enroll, pwd }),
      }
    );
    const data = await res.json();
    setLoading(false);
    if (data.success === "success") {
      toast.success("Student added successfully");

      setStudents({ enroll: "", pwd: "" });
    } else {
      toast
        .error("Failed to add student")
        .then(() => setStudents({ enroll: "", pwd: "" }));
    }
  };

  const handleDelete = async (id) => {
    const x = window.confirm("Are you sure you wants to delete?");
    if (!x) {
      return;
    }
    setLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/auth/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.success === "success") {
      toast.success("Student deleted successfully");
      const updatedList = studList.filter((stud) => stud._id !== id);
      setStudList(updatedList);
    } else {
      toast.error(data.error || "Failed to delete student");
    }
  };

  const further = (res) => {
    for (const student of res) {
      for (const company of compList) {
        if (company._id === student.company) {
          student.company = company;
          break;
        }
      }
    }
    setStudData(res);
  };

  const handleView = async (email) => {
    if (studData[0] && studData[0].email === email) {
      ref.current.click();
      return;
    }
    setStudData([]);
    setPack("");
    setPlacedCompany([]);
    setPlaced("No");
    const uniqueStudent = studList.filter((stud) => stud.email === email);
    if (uniqueStudent.length <= 0) {
      ref.current.click();
      return;
    }
    setPlaced(uniqueStudent[0].placed ? "Yes" : "No");
    let list = [];
    for (const company of compList) {
      if (uniqueStudent[0].companys.includes(company._id)) {
        list.push(company.name);
      }
      if (
        uniqueStudent[0].companys.includes(company._id) &&
        company.ctc > pack
      ) {
        setPack(company.ctc);
      }
    }
    setPlacedCompany(list);
    const res = appList.filter((app) => app.email === email);
    if (res.length <= 0) {
      ref.current.click();
      return;
    }
    further(res);
    ref.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet contains the required data
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Parse the worksheet into JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convert the parsed data into the desired format
        const parsedData = jsonData.slice(1).map((row) => ({
          enroll: row[0], // Assuming enrollment number is the first column
          pwd: row[1], // Assuming password is the second column
        }));

        // Save the parsed data into the state
        setAllStudents(parsedData);
      };

      // Read the file as an array buffer
      reader.readAsArrayBuffer(file);
    }
  };

  const handleClickFileUpload = async () => {
    if (allStudents.length <= 0) {
      alert("Please upload a file first");
      return;
    }
    setLoading(true);
    const data = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/college/multiadd`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allStudents),
      }
    );
    const res = await data.json();
    setLoading(false);
    if (res.success === "success") {
      toast.success("Students added successfully");
      setAllStudents([]);
    } else {
      toast.error(res.error || "Error adding students");
    }
  };

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen p-8">
      <Toaster />
      <div className="max-w-screen-lg m-auto">
        {/* Form Container */}
        <div
          data-twe-modal-init
          className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="exampleModalLong2"
          tabIndex="-1"
          aria-labelledby="exampleModalLongLabel"
          aria-hidden="true">
          <div
            data-twe-modal-dialog-ref
            className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
            <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
                <h5
                  className="text-xl font-medium leading-normal text-surface dark:text-white"
                  id="exampleModalLongLabel">
                  Student Details
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                  data-twe-modal-dismiss
                  aria-label="Close">
                  <button
                    className="[&>svg]:h-6 [&>svg]:w-6"
                    onClick={() => {
                      setStudData([]);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </button>
              </div>

              {
                <div className="relative p-4" style={{ minHeight: "500px" }}>
                  <ul className="w-96 text-surface dark:text-white">
                    {studData.length > 0 &&
                      studData.map((data, index) => {
                        return index === 0 ? (
                          <li
                            key={data._id}
                            className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                            <strong>Name :</strong> {data.name} <br />
                            <strong>Email :</strong> {data.email} <br />
                            <strong>Enrollment :</strong> {data.enroll} <br />
                            <strong>Phone :</strong> {data.phone} <br />
                            <strong>Gender :</strong> {data.gender} <br />
                            <strong>Placed :</strong> {placed} <br />
                            <strong>Company :</strong>{" "}
                            {placedCompany.join(", ")
                              ? placedCompany.join(", ")
                              : "Pending"}{" "}
                            <br />
                            <strong>Package :</strong> {pack || 0} LPA <br />
                          </li>
                        ) : null;
                      })}

                    {studData.length > 0 &&
                      studData.map((data, index) => {
                        return (
                          <li
                            key={data._id}
                            className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                            <strong>{index + 1}. </strong> <br />
                            <strong>Company :</strong> {data.company.name}{" "}
                            <br />
                            <strong>Role :</strong> {data.company.role} <br />
                            <strong>Progress :</strong> {data.company.progress}{" "}
                            <br />
                            <strong>Applied on :</strong>{" "}
                            {data.date
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-") +
                              " " +
                              data.date.split("T")[1].split(".")[0].slice(0, 5)}
                            <br />
                            <strong>Resume :</strong>{" "}
                            <Link
                              className="text-blue-500"
                              to={data.resume}
                              target="_blank"
                              rel="noreferrer noopener">
                              View Resume
                              <FaExternalLinkAlt className="inline ml-2" />
                            </Link>
                          </li>
                        );
                      })}
                    {studData.length <= 0 && (
                      <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                        No data found
                      </li>
                    )}
                  </ul>
                </div>
              }

              <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
                <button
                  type="button"
                  className="inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:bg-blue-400 dark:active:bg-blue-400"
                  onClick={() => {
                    setStudData([]);
                  }}
                  data-twe-modal-dismiss
                  data-twe-ripple-init
                  data-twe-ripple-color="light">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          ref={ref}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hidden"
          data-twe-toggle="modal"
          data-twe-target="#exampleModalLong2"
          data-twe-ripple-init
          data-twe-ripple-color="light"
          type="button">
          Apply
        </button>
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
                Add Student Enrollment
              </h2>
              {/* Upload Excel Button */}
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <label className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white font-semibold rounded-md px-3 py-2 shadow-sm hover:bg-blue-500 transition">
                  <FaFileExcel className="text-xl" />
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />{" "}
                  Upload Excel
                </label>
                <button
                  onClick={handleClickFileUpload}
                  className="text-sm font-semibold text-white bg-blue-600 rounded-md px-3 py-2 shadow-sm hover:bg-blue-500 transition">
                  Add Students
                </button>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Enrollment Number */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="enroll"
                    className="block text-sm font-medium text-gray-800">
                    Enrollment Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border-2 border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaUserCheck className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      name="enroll"
                      value={students.enroll}
                      onChange={(e) =>
                        setStudents({ ...students, enroll: e.target.value })
                      }
                      id="enroll"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="Enter Enrollment Number"
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="pwd"
                    className="block text-sm font-medium text-gray-800">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border-2 border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaLock className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      name="pwd"
                      value={students.pwd}
                      onChange={(e) =>
                        setStudents({ ...students, pwd: e.target.value })
                      }
                      id="pwd"
                      autoComplete="current-password"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-6">
            <button
              type="button"
              onClick={(e) => {
                setStudents({ enroll: "", pwd: "" });
              }}
              className="text-sm font-semibold text-gray-800 hover:underline transition">
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleClick}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
              Save
            </button>
            <button
              onClick={() => navigate("/college-students")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
              Display all enrolled students
            </button>
          </div>
        </motion.form>

        {/* Student List Display */}
        <div className="mt-10 border-t pt-10 border-gray-900/10 pb-12">
          <h2 className="font-semibold leading-7 text-gray-900 text-2xl mb-4">
            Students Details
          </h2>
          <ul className="divide-y divide-gray-200">
            {studList.length > 0 ? (
              studList.map((stud, index) => (
                <motion.li
                  key={stud._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 px-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <div className="flex min-w-0 gap-x-4 items-center">
                    <strong>{index + 1}. </strong>
                    {/* Profile Image */}
                    <img
                      src={stud.image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border border-gray-300"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {stud.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {stud.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-800">
                        {stud.enrollnment}
                      </p>
                      <button
                        type="button"
                        className="ml-2 text-xl hover:text-blue-600 transition"
                        onClick={() => handleView(stud.email)}>
                        <BiSolidUserDetail />
                      </button>
                      <button
                        type="button"
                        className="ml-1 text-xl hover:text-red-600 transition"
                        onClick={() => handleDelete(stud._id)}>
                        <MdDelete />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Batch:{" "}
                      <time dateTime="2023-01-23T13:23Z">{stud.year}</time>
                    </p>
                  </div>
                </motion.li>
              ))
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-sm font-semibold text-gray-800">
                  No team members available
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Studetails;
