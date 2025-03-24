import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import GlowingLoader from "../../components/loader";
import { toast, Toaster } from "react-hot-toast";

const Myprofile = () => {
  const [getResume, setGetResume] = useState("");
  const [resume, setResume] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_DEV_URI}/api/auth/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
          }
        );
        const data = await res.json();
        setLoading(false);
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
        setImagePreview(data.image);
      } catch (error) {
        console.log(error);
        toast.error("Profile not found");
      }
    };

    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (e.target.name === "fname") setFname(e.target.value);
    if (e.target.name === "lname") setLname(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", fname + " " + lname || fname);
    formData.append("coverletter", profile.coverletter);
    formData.append("phoneno", profile.phone);
    if (resume) {
      formData.append("resume", resume);
    }
    formData.append("branch", profile.branch);
    formData.append("gender", profile.gender);
    formData.append("year", profile.year);
    formData.append("cgpa", profile.cgpa);
    formData.append("backlogs", profile.backlogs);
    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_DEV_URI}/api/auth/profile`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("authToken"),
          },
          body: formData,
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === "success") {
        toast.success("Profile updated successfully");
      }
      else{
        toast.error(data.error || "Profile update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="max-w-screen-lg mx-auto my-10 p-8 rounded-2xl border-4 bg-white/70 backdrop-blur-md shadow-xl">
      <Toaster />
      <form>
        <div className="space-y-12">
          {/* Profile Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Profile Photo */}
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="h-16 w-16 rounded-full object-cover shadow-md"
                  />
                  <input
                    id="photo"
                    type="file"
                    name="profileImage"
                    onChange={handleImageChange}
                    className="ml-4 text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                  />
                </div>
              </div>
              {/* Enrollment Number */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="enroll"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Enrollment Number
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="enroll"
                    value={profile.enroll}
                    onChange={handleChange}
                    disabled
                    id="enroll"
                    className="block flex-1 border-0 bg-transparent px-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Cover Letter */}
              <div className="col-span-full">
                <label
                  htmlFor="coverletter"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Cover Letter
                </label>
                <div className="mt-2">
                  <textarea
                    id="coverletter"
                    name="coverletter"
                    value={profile.coverletter}
                    onChange={handleChange}
                    rows="3"
                    maxLength={200}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* First Name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={handleChange}
                    id="fname"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lname"
                    value={lname || ""}
                    onChange={handleChange}
                    id="lname"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* College */}
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
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Phone */}
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
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Branch */}
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
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Year */}
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
                    autoComplete="off"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* CGPA */}
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Backlogs */}
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Gender */}
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full cursor-pointer rounded border border-secondary-500 bg-transparent px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:mr-3 file:py-2 file:px-3 file:bg-transparent file:text-surface focus:border-primary focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white"
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
            onClick={() => navigate("/myprofile")}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleClick}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Myprofile;
