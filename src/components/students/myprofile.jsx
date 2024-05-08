import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Myprofile = () => {
  const [getResume, setGetResume] = useState("");
  const [resume, setResume] = useState("");

  const [profile, setProfile] = useState({
    enroll: "",
    coverletter: "",
    email: "",
    college: "",
    phone: "",
    branch: "",
    gender: "",
    year: "",
    cgpa: "",
    backlogs: "",
  });

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/login";
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://placement-portall.onrender.com/api/auth/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
          }
        );

        const data = await res.json();
        setProfile({
          enroll: data.enrollnment,
          coverletter: data.coverletter,
          email: data.email,
          college: data.college,
          phone: data.phoneno,
          branch: data.branch,
          gender: data.gender,
          year: data.year,
          cgpa: data.cgpa,
          backlogs: data.backlogs,
        });
        setGetResume(data.resume);
        setFname(data.name.split(" ")[0]);
        setLname(data.name.split(" ")[1]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (e.target.name === "fname") setFname(e.target.value);
    if (e.target.name === "lname") setLname(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fname + " " + lname);
    formData.append("coverletter", profile.coverletter);
    formData.append("phoneno", profile.phone);
    if (resume) {
      formData.append("resume", resume);
    } else {
      formData.append("resume", getResume);
    }
    formData.append("branch", profile.branch);
    formData.append("gender", profile.gender);
    formData.append("year", profile.year);
    formData.append("cgpa", profile.cgpa);
    formData.append("backlogs", profile.backlogs);

    try {
      const res = await fetch(
        "https://placement-portall.onrender.com/api/auth/profile",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("authToken"),
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.message === "success") {
        alert("Profile updated successfully");
        window.location.href = "/myprofile";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-lg m-auto my-10 border-4 p-2 px-4 rounded-2xl">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="enroll"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Enrollnment Number
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="enroll"
                      value={profile.enroll}
                      onChange={handleChange}
                      disabled
                      id="enroll"
                      className="block flex-1 border-0 bg-transparent px-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="coverletter"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Cover letter
                </label>
                <div className="mt-2">
                  <textarea
                    id="coverletter"
                    name="coverletter"
                    value={profile.coverletter}
                    onChange={handleChange}
                    rows="3"
                    maxLength={200}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={handleChange}
                    id="fname"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={handleChange}
                    id="lname"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={profile.email}
                    disabled
                    onChange={handleChange}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="college"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  College
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="college"
                    value={profile.college}
                    onChange={handleChange}
                    id="college"
                    autoComplete="college"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    id="phone"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Branch
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="branch"
                    value={profile.branch}
                    onChange={handleChange}
                    id="branch"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Year
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="year"
                    value={profile.year}
                    onChange={handleChange}
                    id="year"
                    autoComplete="year"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="cgpa"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  CGPA
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="cgpa"
                    value={profile.cgpa}
                    onChange={handleChange}
                    id="cgpa"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="backlogs"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Backlogs
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="backlogs"
                    value={profile.backlogs}
                    onChange={handleChange}
                    id="backlogs"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    id="gender"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="formFile"
                className="mb-2 inline-block text-neutral-500 dark:text-neutral-400">
                Update your resume here
              </label>
              <input
                name="resume"
                onChange={(e) => setResume(e.target.files[0])}
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                type="file"
                id="formFile"
              />
            </div>
            <div>
              <Link
                to={getResume}
                target="_blank"
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                <FaExternalLinkAlt className="inline" /> View Resume
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => {
              window.location.href = "/myprofile";
            }}
            type="button"
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
    </div>
  );
};

export default Myprofile;
