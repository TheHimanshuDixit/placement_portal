import React, { useEffect, useState } from "react";
import { Collapse, initTWE } from "tw-elements";
import {
  FaBuilding,
  FaUserTie,
  FaLayerGroup,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const Contribute = () => {
  const [contributionList, setContributionList] = useState([]);
  const [filteredContributions, setFilteredContributions] = useState([]);
  const [filters, setFilters] = useState({
    company: "",
    role: "",
    round: "",
    year: "",
  });

  useEffect(() => {
    initTWE({ Collapse }, { allowReinits: true }, { checkOtherImports: true });

    toast.promise(
      () =>
        fetch(`${process.env.REACT_APP_DEV_URI}/api/contribute/get`)
          .then((res) => res.json())
          .then((data) => {
            setContributionList(data.data);
            setFilteredContributions(data.data);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to fetch data");
          }),
      {
        loading: "Loading...",
        success: "Data fetched successfully",
        error: "Failed to fetch data",
      }
    );
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const filtered = contributionList.filter((item) => {
      return (
        (filters.company === "" || item.company === filters.company) &&
        (filters.role === "" || item.role === filters.role) &&
        (filters.round === "" || item.round.toString() === filters.round) &&
        (filters.year === "" || item.year.toString() === filters.year)
      );
    });
    setFilteredContributions(filtered);
  }, [filters, contributionList]);

  const getUniqueValues = (key) => {
    return [...new Set(contributionList.map((item) => item[key]))].filter(
      Boolean
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <Toaster />
      <div className="container mx-auto px-6 lg:px-24">
        <section className="mb-8">
          <h2 className="mb-6 text-4xl font-extrabold text-center text-gray-800">
            Interview Questions
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8 p-4 bg-white shadow-lg rounded-lg">
            {["company", "role", "round", "year"].map((filterKey) => (
              <div key={filterKey} className="relative w-48">
                <FaFilter className="absolute left-3 top-3 text-gray-500" />
                <select
                  name={filterKey}
                  value={filters[filterKey]}
                  onChange={handleFilterChange}
                  className="w-full pl-10 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring focus:ring-blue-300">
                  <option value="">
                    All {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                  </option>
                  {getUniqueValues(filterKey).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {/* Eamxple    */}
            <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 hidden">
              <h2 className="mb-0" id="flush-headingOne">
                <button
                  className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition hover:z-[2] focus:z-[3] focus:outline-none"
                  type="button"
                  data-twe-collapse-init
                  data-twe-collapse-collapsed
                  data-twe-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne">
                  Example Question {""}
                  <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-[[data-twe-collapse-collapsed]]:rotate-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className=" hidden border-0"
                data-twe-collapse-item
                aria-labelledby="flush-headingOne"
                data-twe-parent="#accordionFlushExample"></div>
              <div className="py-4 px-5 text-neutral-500">Example Answer</div>
            </div>

            {filteredContributions.length > 0 ? (
              filteredContributions.map((key) => (
                <div
                  key={key._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
                    data-twe-collapse-init
                    data-twe-collapse-collapsed
                    data-twe-target={`#flush-${key._id}`}
                    aria-expanded="false"
                    aria-controls={`flush-${key._id}`}>
                    {key.question}
                    <span className="transition-transform duration-300 group-[data-twe-collapse-collapsed]:rotate-180">
                      ▼
                    </span>
                  </button>
                  <div
                    id={`flush-${key._id}`}
                    className="hidden border-t p-5 text-gray-600"
                    data-twe-collapse-item>
                    {key.answer}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-500 rounded-full border border-red-300">
                        <FaBuilding /> {key.company}
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-500 rounded-full border border-blue-300">
                        <FaUserTie /> {key.role}
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-500 rounded-full border border-green-300">
                        <FaLayerGroup /> {key.round} Round
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-500 rounded-full border border-yellow-300">
                        <FaCalendarAlt /> {key.year}
                      </span>
                      {key.topic.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 text-sm bg-purple-100 text-purple-500 rounded-full border border-purple-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contribute;
