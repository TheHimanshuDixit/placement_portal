import React, { useEffect, useState } from "react";
import { Modal, Ripple, Input, Collapse, initTE } from "tw-elements";
import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";

const Mycontributions = () => {
  const [contributionList, setContributionList] = useState([]);
  const [contri, setContri] = useState({
    question: "",
    answer: "",
    company: "",
    role: "",
    year: "",
    round: "",
    topic: [],
  });

  const [idd, setIdd] = useState("");

  const [which, setWhich] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/login";
    }

    initTE({ Collapse, Modal, Ripple, Input });

    fetch("https://placement-portall.onrender.com/api/contribute/getbyid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContributionList(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topic") {
      setContri({ ...contri, [name]: value.split(",") });
    } else {
      setContri({ ...contri, [name]: value });
    }
    console.log(contri);
  };

  const addContribution = async () => {
    if (
      contri.question === "" ||
      contri.answer === "" ||
      contri.company === "" ||
      contri.role === "" ||
      contri.year === "" ||
      contri.round === "" ||
      contri.topic.length === 0
    ) {
      alert("Please Fill All The Fields");
      return;
    }
    const data = await fetch(
      "https://placement-portall.onrender.com/api/contribute/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify(contri),
      }
    );
    const res = await data.json();
    console.log(res);
    if (res.message === "success") {
      setContributionList([...contributionList, contri]);
      alert("Contribution Added Successfully");
    } else {
      alert("Please Try Again");
    }
  };

  const deleteContribution = (id) => {
    return () => {
      fetch(
        `https://placement-portall.onrender.com/api/contribute/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setContributionList(
            contributionList.filter((item) => item._id !== id)
          );
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };
  };

  const editContribution = async (id) => {
    if (
      contri.question === "" ||
      contri.answer === "" ||
      contri.company === "" ||
      contri.role === "" ||
      contri.year === "" ||
      contri.round === "" ||
      contri.topic.length === 0
    ) {
      alert("Please Fill All The Fields");
      return;
    }
    const data = await fetch(
      `https://placement-portall.onrender.com/api/contribute/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify(contri),
      }
    );
    const res = await data.json();
    if (res) {
      setContributionList(
        contributionList.map((item) => {
          if (item._id === id) {
            return contri;
          }
          return item;
        })
      );
      alert("Contribution Updated Successfully");
    } else {
      alert("Please Try Again");
    }
  };

  return (
    <div>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalLong"
        tabIndex="-1"
        aria-labelledby="exampleModalLongLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <h5
                className="text-xl font-medium leading-normal text-surface dark:text-white"
                id="exampleModalLongLabel">
                {which} Contribution
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close">
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="relative p-4" style={{ minHeight: "500px" }}>
              <div className="mx-auto block max-w-md rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
                <form>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <textarea
                      type="text"
                      name="question"
                      defaultValue={contri.question}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput7"
                      placeholder="Question"></textarea>
                    <label
                      htmlFor="exampleInput7"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Question
                    </label>
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <textarea
                      type="text"
                      name="answer"
                      onChange={handleChange}
                      defaultValue={contri.answer}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput8"
                      placeholder="Answer"></textarea>
                    <label
                      htmlFor="exampleInput8"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Answer
                    </label>
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      name="company"
                      value={contri.company}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput9"
                      placeholder="Company"
                    />
                    <label
                      htmlFor="exampleInput9"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Compnay
                    </label>
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      name="role"
                      value={contri.role}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput12"
                      placeholder="Role"
                    />
                    <label
                      htmlFor="exampleInput12"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Role
                    </label>
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      name="year"
                      value={contri.year}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput10"
                      placeholder="Year"
                    />
                    <label
                      htmlFor="exampleInput10"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Year
                    </label>
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      name="round"
                      value={contri.round}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput11"
                      placeholder="Round"
                    />
                    <label
                      htmlFor="exampleInput11"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Round
                    </label>
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      name="topic"
                      value={contri.topic}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput11"
                      placeholder="Topics"
                    />
                    <label
                      htmlFor="exampleInput11"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">
                      Topics
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light">
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  if (which === "Add") {
                    addContribution();
                  } else {
                    editContribution(idd);
                  }
                }}
                className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light">
                {which}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hidden"
        data-te-toggle="modal"
        data-te-target="#exampleModalLong"
        data-te-ripple-init
        data-te-ripple-color="light"
        type="button">
        Apply
      </button>

      <div className="container my-24 mx-auto md:px-6 xl:px-24">
        <section className="mb-32">
          <h2 className="mb-6 pl-6 text-3xl font-bold">
            My Interview Questions!!
          </h2>

          <div id="accordionFlushExample">
            <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
              <h2
                className="mb-0 flex justify-center items-center"
                id="flush-headingOne">
                <span className="text-xl cursor-pointer">
                  <IoIosAddCircle
                    onClick={() => {
                      setWhich("Add");
                      setContri({
                        question: "",
                        answer: "",
                        company: "",
                        role: "",
                        year: "",
                        round: "",
                        topic: [],
                      });
                    }}
                    data-te-toggle="modal"
                    data-te-target="#exampleModalLong"
                  />
                </span>
                <button
                  className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                  type="button"
                  data-te-collapse-init
                  data-te-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne">
                  Example Question
                  <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="!visible border-0"
                data-te-collapse-item
                data-te-collapse-show
                aria-labelledby="flush-headingOne"
                data-te-parent="#accordionFlushExample">
                <div className="px-5 py-4">
                  Click below question to see answer
                </div>
              </div>
            </div>
            {contributionList.map((key) => {
              return (
                <div
                  key={key._id}
                  className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
                  <h2
                    className="mb-0 flex justify-center items-center"
                    id={key.question}>
                    <span className="flex">
                      <FaEdit
                        onClick={() => {
                          setWhich("Edit");
                          setContri({
                            question: key.question,
                            answer: key.answer,
                            company: key.company,
                            role: key.role,
                            year: key.year,
                            round: key.round,
                            topic: key.topic,
                          });
                          setIdd(key._id);
                        }}
                        data-te-toggle="modal"
                        data-te-target="#exampleModalLong"
                        className="text-xl mr-2 cursor-pointer"
                      />
                      <IoIosRemoveCircle
                        onClick={deleteContribution(key._id)}
                        className="text-xl cursor-pointer"
                      />
                    </span>
                    <button
                      className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                      type="button"
                      data-te-collapse-init
                      data-te-collapse-collapsed
                      data-te-target={`#flush-${key._id}`}
                      aria-expanded="false"
                      aria-controls={`flush-${key._id}`}>
                      {key.question}
                      <div className="flex flex-wrap">
                        <span className="my-1 ml-3 rounded-lg p-1 border-2 text-red-400 border-red-400">
                          {key.company}
                        </span>
                        <span className="my-1 ml-3 rounded-lg p-1 border-2 text-red-400 border-red-400">
                          {key.role}
                        </span>
                        <span className="my-1 ml-3 rounded-lg p-1 border-2 text-blue-400 border-blue-400">
                          {key.round} Round
                        </span>
                        <span className="my-1 ml-3 rounded-lg p-1 border-2 text-green-400 border-green-400">
                          {key.year}
                        </span>
                        {key.topic.map((item, index) => {
                          return (
                            <span
                              key={index}
                              className="my-1 ml-3 rounded-lg p-1 border-2 text-yellow-400 border-yellow-400">
                              {item}
                            </span>
                          );
                        })}
                      </div>
                      <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16">
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`flush-${key._id}`}
                    className="!visible hidden border-0"
                    data-te-collapse-item
                    aria-labelledby={key.question}
                    data-te-parent="#accordionFlushExample">
                    <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300">
                      {key.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mycontributions;
