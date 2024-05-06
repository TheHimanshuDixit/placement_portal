import React, { useEffect, useState } from "react";
import { Collapse, initTE } from "tw-elements";

const Contribute = () => {
  const [contributionList, setContributionList] = useState([]);

  useEffect(() => {
    initTE({ Collapse });

    fetch("https://placement-portall.onrender.com/api/contribute/get")
      .then((res) => res.json())
      .then((data) => {
        setContributionList(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="container my-24 mx-auto md:px-6 xl:px-24">
        <section className="mb-32">
          <h2 className="mb-6 pl-6 text-3xl font-bold">
            Interview Questions!!
          </h2>

          <div id="accordionFlushExample">
            <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
              <h2 className="mb-0" id="flush-headingOne">
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
                <div className="px-5 py-4">demo answer</div>
              </div>
            </div>
            {contributionList.map((key) => {
              console.log(key);
              return (
                <div
                  key={key._id}
                  className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
                  <h2 className="mb-0" id={key.question}>
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
                        <div className="my-1 ml-3 rounded-lg p-1 border-2 text-red-400 border-red-400">
                          {key.company}
                        </div>
                        <div className="my-1 ml-3 rounded-lg p-1 border-2 text-red-400 border-red-400">
                          {key.role}
                        </div>
                        <div className="my-1 ml-3 rounded-lg p-1 border-2 text-blue-400 border-blue-400">
                          {key.round} Round
                        </div>
                        <div className="my-1 ml-3 rounded-lg p-1 border-2 text-green-400 border-green-400">
                          {key.year}
                        </div>
                        {key.topic.map((item) => {
                          return (
                            <div className="my-1 ml-3 rounded-lg p-1 border-2 text-yellow-400 border-yellow-400">
                              {item}
                            </div>
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

export default Contribute;
