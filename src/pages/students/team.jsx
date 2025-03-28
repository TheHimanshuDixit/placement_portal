import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUserTie } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Team = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    //eslint-disable-next-line
    toast.promise(
      (async () => {
        const response = await fetch(
          `${process.env.REACT_APP_DEV_URI}/api/team/get`
        );
        const data = await response.json();
        setTeams(data.data);
      })(),
      {
        loading: "Loading...",
        success: "Team data fetched successfully",
        error: "Failed to fetch team data",
      }
    );
  }, []);

  return (
    <div>
      <Toaster />
      <div className="container my-12 mx-auto md:px-6">
        <section className="mb-32 text-center">
          <h2 className="mb-32 text-3xl font-bold">
            Meet the <u className="text-primary dark:text-primary-400">team</u>
          </h2>

          <div className="grid gap-x-6 gap-y-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {teams.map((team) => (
              <div key={team._id} className="mb-24 md:mb-0">
                <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div className="flex justify-center">
                    <div className="flex justify-center -mt-[75px]">
                      <img
                        src={`${team.image}`}
                        className="mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[150px]"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-bold">{team.name}</h5>
                    <p className="flex items-center justify-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      {team.email}
                    </p>
                    <p className="mb-6 flex items-center justify-center gap-2">
                      <FaUserTie className="text-blue-500" />
                      {team.position}
                    </p>
                    <ul className="mx-auto flex list-inside justify-center">
                      <Link href="#!" className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-primary dark:text-primary-400">
                          <path
                            fill="currentColor"
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                          />
                        </svg>
                      </Link>
                      <Link href="#!" className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-primary dark:text-primary-400">
                          <path
                            fill="currentColor"
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                          />
                        </svg>
                      </Link>
                      <Link href="#!" className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 text-primary dark:text-primary-400">
                          <path
                            fill="currentColor"
                            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                          />
                        </svg>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
