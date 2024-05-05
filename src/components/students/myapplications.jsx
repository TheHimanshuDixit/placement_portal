import React, { useEffect, useState } from "react";
import { Modal, Ripple, Input, initTE } from "tw-elements";

const Myapplications = () => {
  const [applications, setApplications] = useState([]);
  // eslint-disable-next-line
  const [open, setOpen] = useState([]);

  // eslint-disable-next-line
  const [company, setCompany] = useState({});
  const [viewCompany, setViewCompany] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    initTE({ Modal, Ripple, Input });

    if (!localStorage.getItem("authToken")) {
      window.location.href = "/login";
    }

    // Fetch the data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://placement-portall.onrender.com/api/application/get",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        setApplications(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    // eslint-disable-next-line
    const data = (async () => {
      const response = await fetch(
        "https://placement-portall.onrender.com/api/opening/getall"
      );
      const data = await response.json();
      setOpen(data.data);
      for (let i = 0; i < data.data.length; i++) {
        company[data.data[i]._id] = data.data[i];
      }
      console.log(company);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
                    <strong>Name :</strong> {viewCompany.name}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>JobID :</strong> {viewCompany.jobId}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Role :</strong> {viewCompany.role}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Internship Stipend :</strong> {viewCompany.stipend}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Company CTC :</strong> {viewCompany.ctc}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Minimum CGPA :</strong> {viewCompany.cgpacritera}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Maximum Backlogs :</strong> {viewCompany.backlog}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Applicable for these branches :</strong>{" "}
                    {viewCompany.branch.map((key) => {
                      return key + ",";
                    })}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Location :</strong>{" "}
                    {viewCompany.location.map((key) => {
                      return key + ",";
                    })}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Gender :</strong> {viewCompany.gender}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Mode :</strong> {viewCompany.mode}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Duration :</strong> {viewCompany.duration}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Apply By :</strong>{" "}
                    {viewCompany.applyby.split("T")[1].split(".")[0] +
                      ", " +
                      viewCompany.applyby.split("T")[0]}
                  </li>
                  <li className="w-full py-4">
                    <strong>Type :</strong> {viewCompany.type}
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
                Already Registered
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
      <div className="max-w-screen-lg m-auto my-10 border-4 p-2 px-4 rounded-2xl">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            My Applications
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Please review the status of your applications.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Sr no.
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Company Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Job Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Application Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        More Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.length > 0 ? (
                      applications.map((application, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {company[application.company] &&
                              company[application.company].name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {company[application.company] &&
                              company[application.company].jobId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {application.date.split("T")[1].split(".")[0] +
                              ", " +
                              application.date.split("T")[0]}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              data-te-toggle="modal"
                              data-te-target="#exampleModalLong2"
                              onClick={() => {
                                setCheck(true);
                                setViewCompany(company[application.company]);
                              }}
                              className="px-4 py-2 bg-primary text-white rounded-lg">
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">No Data</td>
                        <td className="whitespace-nowrap px-6 py-4">No Data</td>
                        <td className="whitespace-nowrap px-6 py-4">No Data</td>
                        <td className="whitespace-nowrap px-6 py-4">No Data</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myapplications;
