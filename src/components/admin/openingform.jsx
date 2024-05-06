import React, { useEffect } from "react";

const Openingform = ({ newOpening, setNewOpening, handleAddOpening, logo, setLogo }) => {
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
              Add New Opening
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
                    value={newOpening.name}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, name: e.target.value })
                    }
                    type="text"
                    autoComplete="name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.jobId}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, jobId: e.target.value })
                    }
                    type="text"
                    autoComplete="jobId"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="formFile"
                  className="mb-2 inline-block text-neutral-500 dark:text-neutral-400">
                  Add Company Logo
                </label>
                <input
                  name="logo"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                  type="file"
                  id="formFile"
                />
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
                    value={newOpening.stipend}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, stipend: e.target.value })
                    }
                    type="text"
                    autoComplete="stipend"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.ctc}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, ctc: e.target.value })
                    }
                    type="text"
                    autoComplete="ctc"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.location}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, location: (e.target.value).split(",")})
                    }
                    type="text"
                    autoComplete="location"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.type}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, type: e.target.value })
                    }
                    type="text"
                    autoComplete="type"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.mode}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, mode: e.target.value })
                    }
                    type="text"
                    autoComplete="mode"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.role}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, role: e.target.value })
                    }
                    type="text"
                    autoComplete="role"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.backlog}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, backlog: e.target.value })
                    }
                    type="text"
                    autoComplete="backlog"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.cgpacritera}
                    onChange={(e) =>
                      setNewOpening({
                        ...newOpening,
                        cgpacritera: e.target.value,
                      })
                    }
                    type="text"
                    autoComplete="cgpacritera"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.branch}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, branch: (e.target.value ).split(",")})
                    }
                    type="text"
                    autoComplete="branch"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <input
                    id="gender"
                    name="gender"
                    value={newOpening.gender}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, gender: e.target.value })
                    }
                    type="text"
                    autoComplete="gender"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Duration
                </label>
                <div className="mt-2">
                  <input
                    id="duration"
                    name="duration"
                    value={newOpening.duration}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, duration: e.target.value })
                    }
                    type="text"
                    autoComplete="duration"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={newOpening.applyby}
                    onChange={(e) =>
                      setNewOpening({ ...newOpening, applyby: e.target.value })
                    }
                    type="text"
                    autoComplete="applyby"
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
            onClick={() =>
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
              })
            }
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            onClick={handleAddOpening}
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
