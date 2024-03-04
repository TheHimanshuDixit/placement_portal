import React, { useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { Modal, Ripple, initTE } from "tw-elements";

const Openings = () => {
  useEffect(() => {
    initTE({ Modal, Ripple });
  }, []);

  const products = [
    {
      id: 1,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Internship",
      mode: "Remote",
      duration: "2 Months",
      logo: "./amazon.png",
    },
    {
      id: 2,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Job",
      mode: "Onsite",
      duration: "Full-time",
      logo: "./amazon.png",
    },
    {
      id: 3,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Onsite",
      mode: "FTE",
      duration: "Full-time",
      logo: "./amazon.png",
    },
    {
      id: 4,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Job",
      mode: "Remote",
      duration: "Full-time",
      logo: "./amazon.png",
    },
  ];

  return (
    <>
      <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalLong"
        tabindex="-1"
        aria-labelledby="exampleModalLongLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
          <div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <h5
                class="text-xl font-medium leading-normal text-surface dark:text-white"
                id="exampleModalLongLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close">
                <span class="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div class="relative p-4" style={{ minHeight: "500px" }}>
              This is some placeholder content to show the scrolling behavior
              for modals. Instead of repeating the text the modal, we use an
              inline style set a minimum height, thereby extending the length of
              the overall modal and demonstrating the overflow scrolling. When
              content becomes longer than the height of the viewport, scrolling
              will move the modal as needed.
            </div>

            <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="button"
                class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light">
                Close
              </button>
              <button
                type="button"
                class="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-te-ripple-init
                data-te-ripple-color="light">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4 text-center underline">
            Jobs/Internships
          </h1>
          <div className="flex justify-evenly align-middle">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-100 p-4 rounded-lg w-60">
                <div className="flex justify-center items-center align-middle">
                  <div>
                    <h2 className="text-xl font-bold mb-2 p-2">
                      {product.comp_name}
                    </h2>
                    <div className="text-sm mb-2 pl-2 flex justify-between items-center">
                      <p>{product.role}</p>
                      <FaCircleInfo className="hover:cursor-pointer" />
                    </div>
                  </div>
                  <img
                    src={product.logo}
                    alt={product.comp_name}
                    className="h-16 w-16 mx-auto "
                  />
                </div>
                <hr className="none mb-6 text-xl border-t-2 border-black" />
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <FaMoneyCheckAlt className="mr-2" /> {product.stipend}/Month
                </div>
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <IoLocation className="mr-2" />
                  {product.mode}
                </div>
                <div className="text-sm mb-2 flex justify-start items-center p-1">
                  <FaCalendarAlt className="mr-2" /> {product.duration}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm border-2 border-black rounded-md bg-slate-300 font-bold uppercase w-1/2 text-center">
                    {product.type}
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                    data-te-toggle="modal"
                    data-te-target="#exampleModalLong"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    type="button">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Openings;
