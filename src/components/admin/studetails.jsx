import React from 'react'
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";

const Studetails = () => {
  return (
    <div className="max-w-screen-lg m-auto">
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
                <div className="ml-2 text-xl">
                  <BiSolidUserDetail />
                </div>
                <div>
                  <MdDelete className="ml-1 text-xl" />
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
}

export default Studetails