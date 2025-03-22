import React, { useEffect, useState } from "react";
import { Collapse, initTWE } from "tw-elements";

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
    initTWE( { Collapse }, { allowReinits: true }, { checkOtherImports: true });

    fetch(`${process.env.REACT_APP_DEV_URI}/api/contribute/get`)
      .then((res) => res.json())
      .then((data) => {
        setContributionList(data.data);
        setFilteredContributions(data.data); // Initialize filtered list
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to update filter state
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Function to filter contributions based on user selections
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

  // Get unique filter values
  const getUniqueValues = (key) => {
    return [...new Set(contributionList.map((item) => item[key]))].filter(
      Boolean
    );
  };

  return (
    <div>
      <div className="container my-24 mx-auto md:px-6 xl:px-24">
        <section className="mb-8">
          <h2 className="mb-6 pl-6 text-3xl font-bold">
            Interview Questions!!
          </h2>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              name="company"
              value={filters.company}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded">
              <option value="">All Companies</option>
              {getUniqueValues("company").map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded">
              <option value="">All Roles</option>
              {getUniqueValues("role").map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              name="round"
              value={filters.round}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded">
              <option value="">All Rounds</option>
              {getUniqueValues("round").map((round) => (
                <option key={round} value={round}>
                  {round} Round
                </option>
              ))}
            </select>

            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded">
              <option value="">All Years</option>
              {getUniqueValues("year").map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Questions List */}
          <div id="accordionFlushExample">
            {filteredContributions.length > 0 ? (
              filteredContributions.map((key, index) => (
                <div
                  key={key._id}
                  className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
                  <h2 className="mb-0" id={key.question}>
                    <button
                      className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition hover:z-[2] focus:z-[3] focus:outline-none"
                      type="button"
                      data-twe-collapse-init
                      data-twe-collapse-collapsed
                      data-twe-target={`#flush-${key._id}`}
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
                        {key.topic.map((item) => (
                          <div
                            key={item}
                            className="my-1 ml-3 rounded-lg p-1 border-2 text-yellow-400 border-yellow-400">
                            {item}
                          </div>
                        ))}
                      </div>
                      <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-[[data-twe-collapse-collapsed]]:rotate-0">
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
                    data-twe-collapse-item
                    aria-labelledby={key.question}
                    data-twe-parent="#accordionFlushExample">
                    <div className="py-4 px-5 text-neutral-500">
                      {key.answer}
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
