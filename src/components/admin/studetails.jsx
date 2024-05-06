import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { Modal, Ripple, Input, initTE } from "tw-elements";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

const Studetails = () => {
  const ref = useRef(null);

  const [students, setStudents] = useState({
    enroll: "",
    pwd: "",
  });

  const [studList, setStudList] = useState([]);
  const [appList, setAppList] = useState([]);
  const [compList, setCompList] = useState([]);
  const [studData, setStudData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("authAdminToken")) {
      window.location.href = "/login";
    }
    initTE({ Modal, Ripple, Input });

    const fetchData = async () => {
      const res = await fetch(
        "https://placement-portall.onrender.com/api/application/getall",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setAppList(data.data);
    };
    fetchData();

    const fetchCompData = async () => {
      const res = await fetch(
        "https://placement-portall.onrender.com/api/opening/getall",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCompList(data.data);
    };
    fetchCompData();

    const fetchStudData = async () => {
      const res = await fetch(
        "https://placement-portall.onrender.com/api/auth",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setStudList(data);
    };
    fetchStudData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const { enroll, pwd } = students;
    if (!enroll || !pwd) {
      alert("Please fill all the fields");
      return;
    }
    const res = await fetch(
      "https://placement-portall.onrender.com/api/college/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enroll, pwd }),
      }
    );
    const data = await res.json();
    if (data.message === "success") {
      alert("Student added successfully");

      setStudents({ enroll: "", pwd: "" });
    } else {
      alert("");
    }
  };

  const handleDelete = async (id) => {
    const x = alert("Are you sure you want to delete this student?");
    if (!x) {
      return;
    }
    const res = await fetch(
      `https://placement-portall.onrender.com/api/auth/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.message === "User deleted") {
      alert("Student deleted successfully");
      const updatedList = studList.filter((stud) => stud._id !== id);
      setStudList(updatedList);
    } else {
      alert("Something went wrong");
    }
  };

  const further = (res) => {
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < compList.length; j++) {
        if (compList[j]._id === res[i].company) {
          res[i].company = compList[j];
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
    const res = appList.filter((app) => app.email === email);
    console.log(res);
    if (res.length <= 0) {
      ref.current.click();
      return;
    }
    further(res);
    ref.current.click();
  };

  return (
    <div className="max-w-screen-lg m-auto">
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
                Student Details
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close">
                <span
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
                </span>
              </button>
            </div>

            {
              <div className="relative p-4" style={{ minHeight: "500px" }}>
                <ul className="w-96 text-surface dark:text-white">
                  {studData.length > 0 &&
                    studData.map((data, index) => {
                      console.log(data);
                      return index === 0 ? (
                        <li
                          key={data._id}
                          className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                          <strong>Name :</strong> {data.name} <br />
                          <strong>Email :</strong> {data.email} <br />
                          <strong>Enrollment :</strong> {data.enroll} <br />
                          <strong>Phone :</strong> {data.phone} <br />
                          <strong>Gender :</strong> {data.gender} <br />
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
                          <strong>Company :</strong> {data.company.name} <br />
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
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                onClick={() => {
                  setStudData([]);
                }}
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        ref={ref}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hidden"
        data-te-toggle="modal"
        data-te-target="#exampleModalLong2"
        data-te-ripple-init
        data-te-ripple-color="light"
        type="button">
        Apply
      </button>
      <form className="p-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
              Add Student Enrollnment
            </h2>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="enroll"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Enrollnment Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="enroll"
                    value={students.enroll}
                    onChange={(e) => {
                      setStudents({ ...students, enroll: e.target.value });
                    }}
                    id="enroll"
                    autoComplete="enroll"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="pwd"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pwd"
                    value={students.pwd}
                    onChange={(e) => {
                      setStudents({ ...students, pwd: e.target.value });
                    }}
                    id="pwd"
                    autoComplete="pwd"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={(e) => {
              setStudents({ enroll: "", pwd: "" });
            }}
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleClick}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
      </form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
          Students Details
        </h2>
      </div>
      <div>
        <ul className="divide-y divide-gray-100">
          {studList.length > 0 &&
            studList.map((stud, index) => {
              return (
                <li
                  key={stud._id}
                  className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <strong>{index + 1}. </strong>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {stud.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {stud.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="flex justify-center items-center">
                      <p className="text-sm leading-6 text-gray-900">
                        {stud.enrollnment}
                      </p>
                      <button className="ml-2 text-xl" type="button">
                        <BiSolidUserDetail
                          onClick={() => {
                            handleView(stud.email);
                          }}
                        />
                      </button>
                      <div>
                        <MdDelete
                          onClick={() => {
                            handleDelete(stud._id);
                          }}
                          className="ml-1 text-xl cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Batch :{" "}
                      <time dateTime="2023-01-23T13:23Z">{stud.year}</time>
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Studetails;
