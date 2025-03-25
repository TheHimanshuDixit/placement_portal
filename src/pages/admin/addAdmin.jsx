import React, { useEffect, useState } from "react";
import Teamdisplay from "../../components/admin/teamDisplay";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaEnvelope,
  FaBriefcase,
  FaLock,
  FaImage,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Addadmin = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [teamDetail, setTeamDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    password: "",
    image: "",
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [type, setType] = useState("Add");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    //eslint-disable-next-line
    toast.promise(
      fetch(`${process.env.REACT_APP_DEV_URI}/api/team/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTeamMembers(data.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        }),
      {
        loading: "Loading...",
        success: "Team Members Loaded Successfully",
        error: "Something went wrong",
      }
    );

    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setTeamDetail({ ...teamDetail, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      teamDetail.firstName === "" ||
      teamDetail.lastName === "" ||
      teamDetail.email === "" ||
      teamDetail.position === "" ||
      teamDetail.password === "" ||
      img === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    toast.success("Please wait...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#333",
      },
    });
    const formData = new FormData();
    if (img) {
      formData.append("file", img);
    }
    formData.append("name", teamDetail.firstName + " " + teamDetail.lastName);
    formData.append("email", teamDetail.email);
    formData.append("position", teamDetail.position);
    formData.append("password", teamDetail.password);

    const res = await fetch(`${process.env.REACT_APP_DEV_URI}/api/team/add`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    if (data.success === "success") {
      toast.success("Team Member Added Successfully");
      setTeamDetail({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        password: "",
      });
      setImg("");
    } else {
      toast.error(data.error || "Something went wrong");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    toast.success("Please wait...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#333",
      },
    });
    const formData = new FormData();
    if (img) formData.append("file", img);
    formData.append("name", teamDetail.firstName + " " + teamDetail.lastName);
    formData.append("email", teamDetail.email);
    formData.append("position", teamDetail.position);
    if (teamDetail.password.length > 0)
      formData.append("password", teamDetail.password);
    fetch(`${process.env.REACT_APP_DEV_URI}/api/team/update/${editId}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error || "Something went wrong");
        } else {
          toast.success("Team Member Updated Successfully");
          setType("Add");
          for (const member of teamMembers) {
            if (member._id === editId) {
              member.name = teamDetail.firstName + " " + teamDetail.lastName;
              member.email = teamDetail.email;
              member.position = teamDetail.position;
              member.image = teamDetail.image;
              if (teamDetail.password.length > 0) {
                member.password = teamDetail.password;
              }
            }
          }
          setTeamDetail({
            firstName: "",
            lastName: "",
            email: "",
            position: "",
            image: "",
            password: "",
          });
          setEditId("");
          setImg("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen p-8">
      <Toaster />
      <div className="max-w-screen-lg m-auto">
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
          <div className="space-y-12">
            <div className="border-b">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center gap-2">
                <FaUsers className="text-blue-500" /> Manage Team Members
              </motion.h1>
            </div>
            <div className="border-b pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* First Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-800">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaUserPlus className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      value={teamDetail.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-800">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaUserPlus className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      name="lastName"
                      value={teamDetail.lastName}
                      onChange={handleChange}
                      id="last-name"
                      autoComplete="family-name"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={teamDetail.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="Email"
                    />
                  </div>
                </div>
                {/* Position */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-800">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaBriefcase className="text-gray-500 mr-2" />
                    <input
                      id="position"
                      name="position"
                      type="text"
                      value={teamDetail.position}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="Position"
                    />
                  </div>
                </div>
                {/* File Input (Image) */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="formFile"
                    className="block text-sm font-medium text-gray-800 mb-2">
                    Upload Your Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaImage className="text-gray-500 mr-2" />
                    <input
                      name="img"
                      onChange={(e) => setImg(e.target.files[0])}
                      type="file"
                      id="formFile"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white bg-opacity-70 px-3 py-2 shadow-md focus-within:border-blue-500 transition">
                    <FaLock className="text-gray-500 mr-2" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={teamDetail.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => {
                setTeamDetail({
                  firstName: "",
                  lastName: "",
                  email: "",
                  position: "",
                  image: "",
                  password: "",
                });
                setType("Add");
                setEditId("");
              }}
              className="text-sm font-semibold text-gray-800 hover:underline">
              Cancel
            </button>
            <button
              onClick={type === "Add" ? handleClick : handleEdit}
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
              {type}
            </button>
          </div>
        </motion.form>

        <div className="mt-10 border-t border-gray-300 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Team Members
          </h2>
          <Teamdisplay
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            teamDetail={teamDetail}
            setTeamDetail={setTeamDetail}
            type={type}
            setType={setType}
            editId={editId}
            setEditId={setEditId}
          />
        </div>
      </div>
    </div>
  );
};

export default Addadmin;
