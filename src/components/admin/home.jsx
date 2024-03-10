import React from "react";

const Admin = () => {
  return (
    <div>
      <div class="container my-3 mx-auto md:px-6">
        <section class="mb-32">
          <div class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://www.jiit.ac.in/sites/default/files/5_0.jpg')] h-[500px]"></div>
          <div class="container mx-auto px-6 md:px-12 xl:px-32">
            <div class="text-center">
              <div class="mt-[-170px] block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:py-16 md:px-12">
                <h1 class="mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                  Welcome to JIIT <br />
                  <span class="text-danger dark:text-danger-400">
                    Placement Portal
                  </span>
                </h1>
                <a
                  class="mb-2 inline-block rounded bg-danger px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] md:mr-2 md:mb-0"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  href="#!"
                  role="button">
                  Admin Login
                </a>
                <a
                  class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:text-danger-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-40"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  href="#!"
                  role="button">
                  Add Admin
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
