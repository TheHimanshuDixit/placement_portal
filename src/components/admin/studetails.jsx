import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { Modal, Ripple, Input, initTE } from "tw-elements";


const Studetails = () => {

  useEffect(() => {
    initTE({ Modal, Ripple, Input });
  }, []);

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
                Company Details
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close">
                <span className="[&>svg]:h-6 [&>svg]:w-6" onClick={() => {}}>
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
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Name :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>JobID :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Role :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Internship Stipend :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Company CTC :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Minimum CGPA :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Maximum Backlogs :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Applicable for these branches :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Location :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Gender :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Mode :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Duration :</strong> {}
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <strong>Apply By :</strong> {}
                  </li>
                  <li className="w-full py-4">
                    <strong>Type :</strong> {}
                  </li>
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
                onClick={() => {}}>
                Close
              </button>
              <button
                type="button"
                className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {}}>
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
                    id="enroll"
                    autoComplete="enroll"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div iv className="sm:col-span-3">
                <label
                  htmlFor="pwd"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pwd"
                    id="pwd"
                    autoComplete="pwd"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
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
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Leslie Alexander
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className="flex justify-center items-center">
                <p className="text-sm leading-6 text-gray-900">
                  Co-Founder / CEO
                </p>
                <button
                  className="ml-2 text-xl"
                  type="button"
                  data-te-toggle="modal"
                  data-te-target="#exampleModalLong2">
                  <BiSolidUserDetail />
                </button>
                <div>
                  <MdDelete className="ml-1 text-xl cursor-pointer" />
                </div>
              </div>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Studetails;
