import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { Modal, Ripple, Input, initTWE } from "tw-elements";
import { Link } from "react-router-dom";
import GlowingLoader from "../../components/loader";

const Openings = () => {
  const [open, setOpen] = useState([]);
  const [cutoff, setCutoff] = useState("");
  const [placed, setPlaced] = useState(false);
  const [comp, setComp] = useState("0");
  const [allCompany, setAllCompany] = useState([]);
  const [pack, setPack] = useState("0");
  //eslint-disable-next-line
  const [cid, setCid] = useState("");
  const [company, setCompany] = useState([]);
  const [check, setCheck] = useState(false);
  const [apply, setApply] = useState({
    name: "",
    email: "",
    enroll: "",
    phone: "",
    branch: "",
    gender: "",
  });
  const [resume, setResume] = useState("");
  const [getResume, setGetResume] = useState("");
  const [loading, setLoading] = useState(true);

  // New states for filter functionality
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [match, setMatch] = useState([]);

  useEffect(() => {
    initTWE(
      { Modal, Ripple, Input },
      { allowReinits: true },
      { checkOtherImports: true }
    );

    // eslint-disable-next-line
    const data = (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/opening/getall`
      );
      const data = await response.json();
      setAllCompany(data.data);

      let ongoingOpen = data.data.filter((item) => {
        return item.progress === "Ongoing";
      });
      setOpen(ongoingOpen);
      setLoading(false);
    })();
  }, [open]);

  const handleFetchAI = async () => {
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/login";
    }
    const response = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/openai/`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
      } // Add the token to the headers
    );
    const data = await response.json();
    setMatch(data.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApply({ ...apply, [name]: value });
  };

  const handleClick = async () => {
    if (
      apply.name === "" ||
      apply.email === "" ||
      apply.enroll === "" ||
      apply.phone === "" ||
      apply.branch === ""
    ) {
      alert("Please fill all the details");
      return;
    }

    if (!resume && !getResume) {
      alert("Please upload your resume");
      return;
    }

    if (
      apply.cgpa >= cutoff &&
      (placed === false ||
        (placed === true && parseInt(comp) >= 1.8 * parseInt(pack)))
    ) {
      const formData = new FormData();
      formData.append("name", apply.name);
      formData.append("email", apply.email);
      if (resume) {
        formData.append("resume", resume);
      } else {
        formData.append("resume", getResume);
      }
      formData.append("enroll", apply.enroll);
      formData.append("gender", apply.gender);
      formData.append("phone", apply.phone);
      formData.append("branch", apply.branch);
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/application/add/${cid}`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("authToken"),
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.message === "success") {
        alert("Applied Successfully");
      } else {
        alert("Already Applied");
      }
      console.log(data);
      window.location.reload();
    } else {
      alert("You are not eligible for this job");
    }
  };

  const handleIt = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DEV_URI}/api/auth/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );

    const result = await response.json();

    setApply({
      name: result.name,
      email: result.email,
      enroll: result.enrollnment,
      phone: result.phoneno,
      branch: result.branch,
      cgpa: result.cgpa,
      gender: result.gender,
    });
    setGetResume(result.resume);
    setPlaced(result.placed);
    for (const company of allCompany) {
      if (result.companys.includes(company._id) && company.ctc > comp) {
        setComp(company.ctc);
      }
    }
  };

  const handleCompTime = (time) => {
    const d1 = new Date(time);
    const d2 = new Date();
    return d1 < d2;
  };

  // Compute the filtered openings based on filter inputs
  const filteredOpen = open.filter((item) => {
    return (
      (filterCompany === "" ||
        item.name.toLowerCase().includes(filterCompany.toLowerCase())) &&
      (filterRole === "" ||
        item.role.toLowerCase().includes(filterRole.toLowerCase()))
    );
  });

  return loading ? (
    <GlowingLoader />
  ) : (
    <>
      <div
        data-twe-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalLong"
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
                Fill all Details
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-twe-modal-dismiss
                aria-label="Close">
                <span className="[&>svg]:h-6 [&>svg]:w-6">
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

            <div className="relative p-4" style={{ minHeight: "500px" }}>
              <div className="mx-auto block max-w-md rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
                <form>
                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="text"
                      name="name"
                      value={apply.name}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput7"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="exampleInput7"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Name <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="email"
                      name="email"
                      value={apply.email}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput8"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="exampleInput8"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Email address <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="text"
                      name="enroll"
                      value={apply.enroll}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput9"
                      placeholder="Enrollnment"
                    />
                    <label
                      htmlFor="exampleInput9"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Enrollment <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="text"
                      name="phone"
                      value={apply.phone}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput12"
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="exampleInput12"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Phone <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="text"
                      name="branch"
                      value={apply.branch}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput10"
                      placeholder="Branch"
                    />
                    <label
                      htmlFor="exampleInput10"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Branch <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="text"
                      name="gender"
                      value={apply.gender}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput11"
                      placeholder="Gender"
                    />
                    <label
                      htmlFor="exampleInput11"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Gender <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-neutral-500 dark:text-neutral-400">
                    Upload your new resume here{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="resume"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setResume(e.target.files[0]);
                    }}
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                    type="file"
                    id="formFile"
                  />
                  <div className="pl-3 pb-1">
                    <Link
                      to={getResume}
                      target="_blank"
                      className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      <FaExternalLinkAlt className="inline" /> View Resume
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-twe-modal-dismiss
                data-twe-ripple-init
                data-twe-ripple-color="light">
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-ripple-init
                data-twe-ripple-color="light">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
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
                Company Details
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-twe-modal-dismiss
                aria-label="Close">
                <button
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
                </button>
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
                    <strong>Internship Stipend :</strong> {company.stipend}{" "}
                    /Month
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Company CTC :</strong> {company.ctc} LPA
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
                data-twe-modal-dismiss
                data-twe-ripple-init
                data-twe-ripple-color="light"
                onClick={() => {
                  setCheck(false);
                }}>
                Close
              </button>
              <button
                type="button"
                className={`ms-1 inline-block rounded ${
                  handleCompTime(company.applyby) ? "bg-gray-500" : "bg-primary"
                } px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong`}
                // data-twe-modal-dismiss
                data-twe-toggle="modal"
                data-twe-target="#exampleModalLong"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                disabled={handleCompTime(company.applyby)}
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
        data-twe-toggle="modal"
        data-twe-target="#exampleModalLong"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        type="button">
        Apply
      </button>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4 text-center underline">
            Jobs/Internships
          </h1>
          {/* Filter Section */}
          <div className="mb-4 flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Filter by Company Name"
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Filter by Role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleFetchAI}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              type="button">
              Match Your Resume
            </button>
          </div>
          <div className="flex justify-evenly align-middle flex-wrap">
            {filteredOpen.map((item, index) => (
              <div
                key={item._id}
                className="bg-gray-100 p-4 rounded-lg w-1/5 m-2">
                <div className="flex justify-between items-center align-middle">
                  <div className="w-2/3">
                    <h2 className="text-xl font-bold mb-2 p-2">{item.name}</h2>
                    {match && match.length > 0 && (
                      <span className="text-sm mb-2 pl-2 flex justify-between items-center">
                        Match : {match[index].score}
                      </span>
                    )}
                    <div className="text-sm mb-2 pl-2 flex justify-between items-center">
                      <p>{item.role}</p>
                      <button
                        data-twe-toggle="modal"
                        data-twe-target="#exampleModalLong2"
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
                    className="h-16 w-16"
                  />
                </div>
                <hr className="none mb-6 text-xl border-t-2 border-black" />
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <FaMoneyCheckAlt className="mr-2" />{" "}
                  {item.stipend ? item.stipend : 0}/Month
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
                      setCid(item._id);
                      setCutoff(item.cgpacritera);
                      setPack(item.ctc);
                      if (!localStorage.getItem("authToken")) {
                        window.location.href = "/login";
                      }
                      handleIt();
                    }}
                    disabled={handleCompTime(item.applyby)}
                    className={`${
                      handleCompTime(item.applyby)
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    } text-white px-4 py-2 rounded-xl`}
                    data-twe-toggle="modal"
                    data-twe-target="#exampleModalLong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    type="button">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Openings;
