import React from "react";

const FAQSection = () => {
  return (
    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-7/12 md:px-3 lg:px-6">
      <h2 className="mb-8 text-3xl font-bold">Frequently asked questions</h2>
      <p className="mb-2 font-bold">
        What is the purpose of the training and placement portal?
      </p>
      <p className="mb-8 text-neutral-500 dark:text-neutral-300">
        The training and placement portal is designed to serve as a bridge
        between students and potential employers. Its primary goal is to assist
        students in securing internships, as well as full-time and part-time job
        opportunities.
      </p>
      <p className="mb-2 font-bold">
        Can I access the training and placement portal after graduation?
      </p>
      <p className="mb-8 text-neutral-500 dark:text-neutral-300">
        Yes, you can continue to access the portal for a certain period after
        graduation. However, access might be limited for a specific time.
      </p>
      <p className="mb-2 font-bold">
        Can you change your registered email-id once signed-up on the portal?
      </p>
      <p className="mb-8 text-neutral-500 dark:text-neutral-300">
        Once registered on the portal, email IDs cannot be changed. Therefore,
        users are advised to carefully select their email IDs during the
        registration process. However, if a change is necessary, users may
        contact the Training and Placement team. Please note that a fine may be
        applicable for email ID changes.
      </p>

      <p className="mb-2 font-bold">
        Who should you contact if you encounter technical difficulties with the
        website?
      </p>
      <p className="text-neutral-500 dark:text-neutral-300">
        If you encounter technical difficulties while using the training and
        placement website, you can reach out to the college's IT department or
        the support team designated for the website for assistance.
      </p>
    </div>
  );
};

export default FAQSection;
