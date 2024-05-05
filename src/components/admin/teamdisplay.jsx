import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const Teamdisplay = ({
  teamMembers,
  setTeamMembers,
  setTeamDetail,
  setType,
  editId,
  setEditId,
}) => {
  useEffect(() => {
    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      window.location.href = "/login";
    }
  }, []);

  const handleDelete = async (id) => {
    const x = window.confirm(
      "Are you sure you want to delete this team member?"
    );
    console.log(x);
    if (x) {
      try {
        const response = await fetch(
          `https://placement-portall.onrender.com/api/team/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.data) {
          alert("Team member deleted successfully");
          setTeamMembers(teamMembers.filter((member) => member._id !== editId));
          setEditId("");
          window.location.reload();
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {teamMembers.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {teamMembers.map((member) => {
            return (
              <li
                key={member._id}
                className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={member.image}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {member.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="flex justify-center items-center">
                    <p className="text-sm leading-6 text-gray-900">
                      {member.position}
                    </p>
                    <div className="ml-2">
                      <MdModeEditOutline
                        className="text-xl cursor-pointer"
                        onClick={() => {
                          setType("Edit");
                          setEditId(member._id);
                          setTeamDetail({
                            firstName: member.name.split(" ")[0],
                            lastName: member.name.split(" ")[1],
                            email: member.email,
                            position: member.position,
                            image: member.image,
                            password: "",
                          });
                          window.scrollTo(90, 90);
                        }}
                      />
                    </div>
                    <div>
                      <MdDelete
                        onClick={() => {
                          handleDelete(member._id);
                        }}
                        className="ml-1 text-xl cursor-pointer"
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Date of Joining :{" "}
                    <time dateTime="2023-01-23T13:23Z">
                      {member.date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-") +
                        " " +
                        member.date.split("T")[1].split(".")[0].slice(0, 5)}
                    </time>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            No team members available
          </p>
        </div>
      )}
    </div>
  );
};

export default Teamdisplay;
