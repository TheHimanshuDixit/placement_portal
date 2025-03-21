import React, { useEffect, useState } from "react";
import Teamdisplay from "../../components/admin/teamdisplay";
import GlowingLoader from "../../components/loader";

const Addadmin = () => {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //eslint-disable-next-line
    const resp = fetch(`${process.env.REACT_APP_DEV_URI}/api/team/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTeamMembers(data.data);
        setLoading(false);
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
      alert("All fields are required");
      return;
    }

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
    if (data.message === "success") {
      alert("Team Member Added Successfully");
      setTeamDetail({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        password: "",
      });
      setImg("");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Team Member Edited Successfully");
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
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return loading ? (
    <GlowingLoader />
  ) : (
    <div className="bg-pink-50">
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
                    First name <span className="text-red-500">*</span>
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
                    Last name <span className="text-red-500">*</span>
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

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Email address <span className="text-red-500">*</span>
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

                <div className="sm:col-span-6">
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="position"
                      name="position"
                      type="text"
                      value={teamDetail.position}
                      onChange={handleChange}
                      autoComplete=""
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-sm font-medium leading-6 text-gray-900">
                    Upload Your Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="img"
                    onChange={(e) => setImg(e.target.files[0])}
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                    type="file"
                    id="formFile"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={teamDetail.password}
                      onChange={handleChange}
                      autoComplete="current-password"
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
    </div>
  );
};

export default Addadmin;
