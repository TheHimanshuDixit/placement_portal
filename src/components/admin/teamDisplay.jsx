import React, { useEffect } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Teamdisplay = ({
  teamMembers,
  setTeamMembers,
  setTeamDetail,
  setType,
  editId,
  setEditId,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

    const dateISOToLocaleString = (isoString) => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const localDateTimeString = `${hours}:${minutes}, ${day}-${month}-${year}`;
      return localDateTimeString; // Output: 2025-03-26T16:00:00
    };

  const handleDelete = async (id) => {
    const x = window.confirm(
      "Are you sure you want to delete this team member?"
    );
    if (x) {
      try {
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
        const response = await fetch(
          `${process.env.REACT_APP_DEV_URI}/api/team/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.data) {
          toast.success("Team member deleted successfully");
          // eslint-disable-next-line
          setTeamMembers(teamMembers.filter((member) => member._id != editId));
          setEditId("");
        } else {
          toast.error(data.error || "Error deleting team member");
        }
      } catch (error) {
        toast.error("Error deleting team member");
      } 
    }
  };

  return (
    <div>
      <Toaster />
      {teamMembers.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {teamMembers.map((member, index) => (
            <motion.li
              key={member._id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 px-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <div className="flex items-center gap-4">
                <img
                  className="h-16 w-16 rounded-full object-cover border border-gray-300"
                  src={member.image}
                  alt={member.name}
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <p className="text-base text-gray-800">{member.position}</p>
                  <MdModeEditOutline
                    className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
                    onClick={() => {
                      console.log(member);
                      setType("Edit");
                      setEditId(member._id);
                      setTeamDetail({
                        firstName: member.name.split(" ")[0],
                        lastName: member.name.split(" ")[1],
                        email: member.email,
                        position: member.position,
                        image: member.image,
                        password: "********",
                      });
                      toast.success("Edit mode enabled");
                      window.scrollTo({ top: 90, behavior: "smooth" });
                    }}
                  />
                  <MdDelete
                    className="text-2xl text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                    onClick={() => handleDelete(member._id)}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Date of Joining:{" "}
                  <time dateTime={member.date}>
                    {dateISOToLocaleString(member.date)}
                  </time>
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-base font-semibold text-gray-800">
            No team members available
          </p>
        </div>
      )}
    </div>
  );
};

Teamdisplay.propTypes = {
  teamMembers: PropTypes.array.isRequired,
  setTeamMembers: PropTypes.func.isRequired,
  setTeamDetail: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  editId: PropTypes.string.isRequired,
  setEditId: PropTypes.func.isRequired,
};

export default Teamdisplay;
