import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { Modal, Ripple, Input, initTE } from "tw-elements";
import Openingform from "./openingform";
import { FaDownload } from "react-icons/fa";

const Addopening = () => {
  const [open, setOpen] = useState([]);
  //eslint-disable-next-line
  const [company, setCompany] = useState([]);
  const [check, setCheck] = useState(false);
  const [regList, setRegList] = useState([]);
  const [logo, setLogo] = useState("");

  const [newOpening, setNewOpening] = useState({
    name: "",
    jobId: "",
    stipend: "",
    ctc: "",
    location: [],
    type: "",
    mode: "",
    role: "",
    backlog: "",
    cgpacritera: "",
    branch: [],
    gender: "",
    duration: "",
    applyby: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("authAdminToken")) {
      window.location.href = "/login";
    }

    initTE({ Modal, Ripple, Input });

    //eslint-disable-next-line
    const data = (async () => {
      const response = await fetch(
        "https://placement-portall.onrender.com/api/opening/getall"
      );
      const data = await response.json();
      // console.log(data.data);
      setOpen(data.data);
    })();
  }, []);

  const handleIt = async (id) => {
    const response = await fetch(
      `https://placement-portall.onrender.com/api/application/get/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // eslint-disable-next-line
    const result = await response.json();
    setRegList(result.data);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://placement-portall.onrender.com/api/opening/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // eslint-disable-next-line
    const result = await response.json();
    if (result.message === "success") {
      alert("Deleted Successfully");
      setOpen(open.filter((item) => item._id !== id));
      window.location.reload();
    } else {
      alert("Error in Deleting");
    }
  };

  const handleAddOpening = async () => {
    const formData = new FormData();
    formData.append("file", logo);
    formData.append("name", newOpening.name);
    formData.append("jobId", newOpening.jobId);
    formData.append("stipend", newOpening.stipend);
    formData.append("ctc", newOpening.ctc);
    formData.append("location", newOpening.location);
    formData.append("type", newOpening.type);
    formData.append("mode", newOpening.mode);
    formData.append("role", newOpening.role);
    formData.append("backlog", newOpening.backlog);
    formData.append("cgpacritera", newOpening.cgpacritera);
    formData.append("branch", newOpening.branch);
    formData.append("gender", newOpening.gender);
    formData.append("duration", newOpening.duration);
    formData.append("applyby", newOpening.applyby);
    const response = await fetch(
      "https://placement-portall.onrender.com/api/opening/add",
      {
        method: "POST",
        body: formData,
      }
    );
    // eslint-disable-next-line
    const result = await response.json();
    if (result.message === "success") {
      alert("Added Successfully");
      setOpen([...open, newOpening]);
      setNewOpening({
        name: "",
        jobId: "",
        stipend: "",
        ctc: "",
        location: [],
        type: "",
        mode: "",
        role: "",
        backlog: "",
        cgpacritera: "",
        branch: [],
        gender: "",
        duration: "",
        applyby: "",
      });
      window.location.reload();
    } else {
      alert("Error in Adding");
    }
  };

  const handleDownload = async () => {
    const response = await fetch(
      `https://placement-portall.onrender.com/api/application/get/${regList[0].company}`
    );
    const data = await response.json();
    console.log(data);
    const csv = data.data.map((item, index) => {
      return {
        SrNo: index + 1,
        Name: item.name,
        Email: item.email,
        Enrollment: item.enroll,
        Phone: item.phone,
        Gender: item.gender,
        Resume: item.resume,
      };
    });
    const csvData = csv.map((row) =>
      Object.values(row)
        .map((value) => JSON.stringify(value))
        .join(",")
    );
    csvData.unshift(Object.keys(csv[0]));
    const csvArray = csvData.join("\r\n");

    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + csvArray;
    a.download = "Applicants.csv";
    a.click();
  };

  return (
    <>
      <Openingform
        newOpening={newOpening}
        setNewOpening={setNewOpening}
        handleAddOpening={handleAddOpening}
        logo={logo}
        setLogo={setLogo}
      />
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalLong1"
        tabIndex="-1"
        aria-labelledby="exampleModalLongLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <h5
                className="flex justify-center items-center text-xl font-medium leading-normal text-surface dark:text-white"
                id="exampleModalLongLabel">
                Applicant list
                <FaDownload
                  onClick={handleDownload}
                  className="ml-2 cursor-pointer"
                />
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close">
                <span
                  className="[&>svg]:h-6 [&>svg]:w-6"
                  onClick={() => {
                    setCheck(false);
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
                </span>
              </button>
            </div>

            {
              <div className="relative p-4" style={{ minHeight: "500px" }}>
                <ul className="w-96 text-surface dark:text-white">
                  {regList.length > 0 ? (
                    regList.map((item, index) => (
                      <li
                        key={item._id}
                        className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                        <strong>{index + 1}. Name : </strong>
                        {item.name}
                        <br />
                        <strong>Email : </strong>
                        {item.email}
                      </li>
                    ))
                  ) : (
                    <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                      <strong>No Applicants</strong>
                    </li>
                  )}
                </ul>
              </div>
            }

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {
                  setCheck(false);
                }}>
                Close
              </button>
              {/* <button
                type="button"
                className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {
                  setCheck(false);
                }}>
                Apply
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalLong2"
        tabIndex="-1"
        aria-labelledby="exampleModalLongLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <h5
                className="text-xl font-medium leading-normal text-surface dark:text-white"
                id="exampleModalLongLabel">
                Company Details
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close">
                <span
                  className="[&>svg]:h-6 [&>svg]:w-6"
                  onClick={() => {
                    setCheck(false);
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
                </span>
              </button>
            </div>

            {check && (
              <div className="relative p-4" style={{ minHeight: "500px" }}>
                <ul className="w-96 text-surface dark:text-white">
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Name :</strong> {company.name}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>JobID :</strong> {company.jobId}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Role :</strong> {company.role}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Internship Stipend :</strong> {company.stipend}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Company CTC :</strong> {company.ctc}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Minimum CGPA :</strong> {company.cgpacritera}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Maximum Backlogs :</strong> {company.backlog}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Applicable for these branches :</strong>{" "}
                    {company.branch.map((key) => {
                      return key + ",";
                    })}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Location :</strong>{" "}
                    {company.location.map((key) => {
                      return key + ",";
                    })}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Gender :</strong> {company.gender}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Mode :</strong> {company.mode}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Duration :</strong> {company.duration}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Apply By :</strong>{" "}
                    {company.applyby.split("T")[1].split(".")[0] +
                      ", " +
                      company.applyby.split("T")[0]}
                  </li>
                  <li className="w-full py-4">
                    <strong>Type :</strong> {company.type}
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {
                  setCheck(false);
                }}>
                Close
              </button>
              <button
                type="button"
                className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {
                  setCheck(false);
                }}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hidden"
        data-te-toggle="modal"
        data-te-target="#exampleModalLong"
        data-te-ripple-init
        data-te-ripple-color="light"
        type="button">
        Apply
      </button>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4 text-center underline">
            Jobs/Internships
          </h1>
          <div className="flex justify-evenly align-middle">
            {open.map((item) => (
              <div key={item._id} className="bg-gray-100 p-4 rounded-lg w-60">
                <div className="flex justify-center items-center align-middle">
                  <div>
                    <h2 className="text-xl font-bold mb-2 p-2">{item.name}</h2>
                    <div className="text-sm mb-2 pl-2 flex justify-between items-center">
                      <p>{item.role}</p>
                      <button
                        data-te-toggle="modal"
                        data-te-target="#exampleModalLong2"
                        onClick={() => {
                          setCompany(item);
                          setCheck(true);
                        }}
                        type="button">
                        <FaCircleInfo className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <img
                    src={item.logo}
                    alt={item.comp_name}
                    className="h-16 w-16 mx-auto "
                  />
                </div>
                <hr className="none mb-6 text-xl border-t-2 border-black" />
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <FaMoneyCheckAlt className="mr-2" /> {item.stipend}/Month
                </div>
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <IoLocation className="mr-2" />
                  {item.mode}
                </div>
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <FaCalendarAlt className="mr-2" /> {item.duration}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm border-2 border-black rounded-md bg-slate-300 font-bold uppercase w-1/2 text-center">
                    {item.type}
                  </div>
                  <button
                    onClick={() => {
                      handleIt(item._id);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md border-2 border-black text-sm"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    data-te-toggle="modal"
                    data-te-target="#exampleModalLong1"
                    type="button">
                    Stud. List
                  </button>
                </div>
                <button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                  className="bg-red-500 text-white w-52 border-2 border-black rounded-md mt-2">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Addopening;
