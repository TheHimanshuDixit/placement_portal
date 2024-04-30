import React, { useEffect, useState } from "react";
import Teamdisplay from "./teamdisplay";

const Addadmin = () => {
  const [teamDetail, setTeamDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    image: "",
    password: "",
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [type, setType] = useState("Add");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    //eslint-disable-next-line
    const resp = fetch("https://placement-portall.onrender.com/api/team/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });

    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    setTeamDetail({ ...teamDetail, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch("https://placement-portall.onrender.com/api/team/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Team Member Added Successfully");
          setTeamDetail({
            firstName: "",
            lastName: "",
            email: "",
            position: "",
            image: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const handleEdit = (e) => {
    console.log(editId);
    console.log(teamDetail);
    e.preventDefault();
    fetch(`https://placement-portall.onrender.com/api/team/update/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        teamDetail.password.length > 0
          ? teamDetail
          : {
              name: teamDetail.firstName + " " + teamDetail.lastName,
              email: teamDetail.email,
              position: teamDetail.position,
              image: teamDetail.image,
            }
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Team Member Edited Successfully");
          setType("Add");
          for (let i = 0; i < teamMembers.length; i++) {
            if (teamMembers[i]._id === editId) {
              teamMembers[i].name =
                teamDetail.firstName + " " + teamDetail.lastName;
              teamMembers[i].email = teamDetail.email;
              teamMembers[i].position = teamDetail.position;
              teamMembers[i].image = teamDetail.image;
              teamDetail.password.length > 0 &&
                (teamMembers[i].password = teamDetail.password);
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
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={teamDetail.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    value={teamDetail.lastName}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    type="email"
                    value={teamDetail.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Position
                </label>
                <div className="mt-2">
                  <input
                    id="position"
                    name="position"
                    type="text"
                    value={teamDetail.position}
                    onChange={handleChange}
                    autoComplete="position"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Image link
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={teamDetail.image}
                    onChange={handleChange}
                    autoComplete="image"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={teamDetail.password}
                    onChange={handleChange}
                    autoComplete="password"
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
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            onClick={type === "Add" ? handleClick : handleEdit}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {type}
          </button>
        </div>
      </form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
          Team Members
        </h2>
      </div>
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
  );
};

export default Addadmin;
