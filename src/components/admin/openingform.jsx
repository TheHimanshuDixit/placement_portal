import React, { useEffect } from "react";

const Openingform = () => {
  
  useEffect(() => {
    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="max-w-screen-lg m-auto">
      <form className="p-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
              Add Team Member
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Company Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="jobId"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Company Job ID
                </label>
                <div className="mt-2">
                  <input
                    id="jobId"
                    name="jobId"
                    type="text"
                    autoComplete="jobId"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="stipend"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Intern Stipend (in INR)
                </label>
                <div className="mt-2">
                  <input
                    id="stipend"
                    name="stipend"
                    type="text"
                    autoComplete="stipend"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="ctc"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  CTC (in LPA)
                </label>
                <div className="mt-2">
                  <input
                    id="ctc"
                    name="ctc"
                    type="text"
                    autoComplete="ctc"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="location"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Intern, FTE, Intern+FTE
                </label>
                <div className="mt-2">
                  <input
                    id="type"
                    name="type"
                    type="text"
                    autoComplete="type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="mode"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Mode
                </label>
                <div className="mt-2">
                  <input
                    id="mode"
                    name="mode"
                    type="text"
                    autoComplete="mode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </label>
                <div className="mt-2">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    autoComplete="role"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="backlog"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Maximum Backlog
                </label>
                <div className="mt-2">
                  <input
                    id="backlog"
                    name="backlog"
                    type="text"
                    autoComplete="backlog"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="cgpacritera"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  CGPA Cutoff
                </label>
                <div className="mt-2">
                  <input
                    id="cgpacritera"
                    name="cgpacritera"
                    type="text"
                    autoComplete="cgpacritera"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Branch
                </label>
                <div className="mt-2">
                  <input
                    id="branch"
                    name="branch"
                    type="text"
                    autoComplete="branch"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Intern, FTE, Intern+FTE
                </label>
                <div className="mt-2">
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Intern, FTE, Intern+FTE
                </label>
                <div className="mt-2">
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    autoComplete="duration"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="applyby"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last Date to Apply (YYYY-MM-DDTHH:MM:SSZ)
                </label>
                <div className="mt-2">
                  <input
                    id="applyby"
                    name="applyby"
                    type="text"
                    autoComplete="applyby"
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
    </div>
  );
};

export default Openingform;
