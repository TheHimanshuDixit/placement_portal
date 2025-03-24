import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaIdBadge,
  FaFileImage,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaLayerGroup,
  FaBriefcase,
  FaExclamationTriangle,
  FaGraduationCap,
  FaUserGraduate,
  FaUniversity,
  FaVenusMars,
  FaClock,
  FaList,
  FaFileAlt,
  FaClipboard,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Openingform = ({
  newOpening,
  setNewOpening,
  handleAddOpening,
  handleEditOpening,
  type,
  setType,
  setLogo,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authAdminToken");
    if (!authToken) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen p-8">
      <div className="max-w-screen-lg m-auto">
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
          <div className="space-y-2">
            <div className="border-b pb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Opening
              </h2>
            </div>

            <div className="border-b pb-6">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Company Name */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaBuilding className="text-blue-600" /> Company Name{" "}
                    <span className="text-red-500">*</span>
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
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                {/* Company Job ID */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="jobId"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaIdBadge className="text-blue-600" /> Company Job ID{" "}
                    <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter job ID"
                    />
                  </div>
                </div>

                {/* Company Logo */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="formFile"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1 mb-2">
                    <FaFileImage className="text-blue-600" /> Add Company Logo{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="logo"
                    onChange={(e) => setLogo(e.target.files[0])}
                    type="file"
                    id="formFile"
                    className="block w-full text-gray-800 bg-white rounded-md border-2 border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 transition"
                  />
                </div>

                {/* Intern Stipend */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="stipend"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaMoneyCheckAlt className="text-blue-600" /> Intern Stipend
                    (in INR) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="stipend"
                      name="stipend"
                      value={newOpening.stipend}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          stipend: e.target.value,
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter intern stipend"
                    />
                  </div>
                </div>

                {/* CTC */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="ctc"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaMoneyBillWave className="text-blue-600" /> CTC (in LPA){" "}
                    <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter CTC in LPA"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaMapMarkedAlt className="text-blue-600" /> Location{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="location"
                      name="location"
                      value={newOpening.location}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          location: e.target.value.split(","),
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter locations separated by commas"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaLayerGroup className="text-blue-600" /> Intern, FTE,
                    Intern+FTE <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter type (e.g. Intern, FTE, Intern+FTE)"
                    />
                  </div>
                </div>

                {/* Mode */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="mode"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaBriefcase className="text-blue-600" /> Mode{" "}
                    <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter mode (e.g. Offline, Online)"
                    />
                  </div>
                </div>

                {/* Role */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaUserGraduate className="text-blue-600" /> Role{" "}
                    <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter role"
                    />
                  </div>
                </div>

                {/* Maximum Backlog */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="backlog"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaExclamationTriangle className="text-blue-600" /> Maximum
                    Backlog <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="backlog"
                      name="backlog"
                      value={newOpening.backlog}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          backlog: e.target.value,
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter maximum backlog allowed"
                    />
                  </div>
                </div>

                {/* CGPA Cutoff */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="cgpacritera"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaGraduationCap className="text-blue-600" /> CGPA Cutoff{" "}
                    <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter CGPA cutoff"
                    />
                  </div>
                </div>

                {/* Batch */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="batch"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaClipboard className="text-blue-600" /> Batch{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="batch"
                      name="batch"
                      value={newOpening.batch}
                      onChange={(e) =>
                        setNewOpening({ ...newOpening, batch: e.target.value })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter batch"
                    />
                  </div>
                </div>

                {/* Branch */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="branch"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaUniversity className="text-blue-600" /> Branch{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="branch"
                      name="branch"
                      value={newOpening.branch}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          branch: e.target.value.split(","),
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter branches separated by commas"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaVenusMars className="text-blue-600" /> Gender{" "}
                    <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter gender"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="duration"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaClock className="text-blue-600" /> Duration{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="duration"
                      name="duration"
                      value={newOpening.duration}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          duration: e.target.value,
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter duration (e.g., 6 months)"
                    />
                  </div>
                </div>

                {/* Last Date to Apply */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="applyby"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaRegCalendarAlt className="text-blue-600" /> Last Date to
                    Apply <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="applyby"
                      name="applyby"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const isoFormattedDate = selectedDate.toISOString();
                        let format = isoFormattedDate.split(".")[0];
                        format += "Z";
                        setNewOpening({
                          ...newOpening,
                          applyby: format,
                        });
                      }}
                      type="datetime-local"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter last date to apply"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="requirements"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaList className="text-blue-600" /> Requirements
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={5}
                      id="requirements"
                      name="requirements"
                      value={newOpening.requirements.join(",")}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          requirements: e.target.value.split(","),
                        })
                      }
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter requirements separated by commas"
                    />
                  </div>
                </div>

                {/* Job Description */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="jobdescription"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaFileAlt className="text-blue-600" /> Job Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={5}
                      id="jobdescription"
                      name="jobdescription"
                      value={newOpening.jobdescription}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          jobdescription: e.target.value.split(","),
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter job description items separated by commas"
                    />
                  </div>
                </div>

                {/* Selection Process */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="selectionprocess"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaClipboard className="text-blue-600" /> Selection Process
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={5}
                      id="selectionprocess"
                      name="selectionprocess"
                      value={newOpening.selectionprocess}
                      onChange={(e) =>
                        setNewOpening({
                          ...newOpening,
                          selectionprocess: e.target.value.split(","),
                        })
                      }
                      type="text"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                      placeholder="Enter selection process items separated by commas"
                    />
                  </div>
                </div>

                {/* Pre Placement Talk */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="ppt"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaChalkboardTeacher className="text-blue-600" /> Pre
                    Placement Talk (PPT)
                  </label>
                  <div className="mt-2">
                    <input
                      id="ppt"
                      name="ppt"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const isoFormattedDate = selectedDate.toISOString();
                        let format = isoFormattedDate.split(".")[0];
                        format += "Z";
                        setNewOpening({
                          ...newOpening,
                          ppt: format,
                        });
                      }}
                      type="datetime-local"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Coding Test */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="test"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaLaptopCode className="text-blue-600" /> Coding Test
                  </label>
                  <div className="mt-2">
                    <input
                      id="test"
                      name="test"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const isoFormattedDate = selectedDate.toISOString();
                        let format = isoFormattedDate.split(".")[0];
                        format += "Z";
                        setNewOpening({
                          ...newOpening,
                          test: format,
                        });
                      }}
                      type="datetime-local"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Interview */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="interview"
                    className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaRegCalendarAlt className="text-blue-600" /> Interview
                  </label>
                  <div className="mt-2">
                    <input
                      id="interview"
                      name="interview"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const isoFormattedDate = selectedDate.toISOString();
                        let format = isoFormattedDate.split(".")[0];
                        format += "Z";
                        setNewOpening({
                          ...newOpening,
                          interview: format,
                        });
                      }}
                      type="datetime-local"
                      autoComplete="on"
                      className="outline-none px-3 block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-6">
            <button
              type="button"
              onClick={() => {
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
                  requirements: [],
                  jobdescription: [],
                  selectionprocess: [],
                  ppt: "",
                  test: "",
                  interview: "",
                });
                setType("Add");
              }}
              className="text-sm font-semibold text-gray-800 hover:underline transition">
              Cancel
            </button>
            <button
              onClick={type === "Add" ? handleAddOpening : handleEditOpening}
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
              {type === "Add" ? "Add Opening" : "Edit Opening"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};
Openingform.propTypes = {
  newOpening: PropTypes.object.isRequired,
  setNewOpening: PropTypes.func.isRequired,
  handleAddOpening: PropTypes.func.isRequired,
  handleEditOpening: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  setLogo: PropTypes.func.isRequired,
};

export default Openingform;
