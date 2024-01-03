import React, { useState, useEffect } from "react";
import Link from "next/link";

const Maintenance = () => {
  const maintenanceEndDate = new Date("2024-01-31T00:00:00Z"); // Set the maintenance end date

  const [formattedEndDate, setFormattedEndDate] = useState("");

  useEffect(() => {
    // Format the date on the client side
    setFormattedEndDate(
      maintenanceEndDate.toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "UTC",
      })
    );
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = maintenanceEndDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      return { days, hours, minutes };
    } else {
      return { days: 0, hours: 0, minutes: 0 };
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 via-slate-100 to-purple-300 overflow-y-scroll">
      <div className="flex items-center justify-center ">
        <div className="text-center">
          <svg
            className="w-32 h-32 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <img
            className="w-1/2 mt-4 mx-auto"
            src="https://i.ibb.co/GPqTsYn/company.webp"
            alt="company"
          />
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            Under Maintenance
          </h1>
          <p className="text-gray-600 mt-2">
            We are currently working on improving our website. Please check back
            later.
          </p>

          <div className="mt-6">
            <p className="text-gray-700">Maintenance period ends on:</p>
            <div className="text-2xl font-bold text-indigo-600">
              {formattedEndDate}
            </div>
            <p className="text-gray-700 mt-2">
              Time remaining: {timeRemaining.days} days, {timeRemaining.hours}{" "}
              hours, {timeRemaining.minutes} minutes
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="mailto:bangladeshiSoftware@gmail.com"
              className="inline-block px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
            >
              Contact Us
            </Link>
            <Link
              href="https://docs.botgmail.com"
              // open in new tab
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-3 px-6 py-3 text-indigo-600 border border-indigo-600 rounded-full hover:border-indigo-700 focus:outline-none focus:shadow-outline-indigo active:border-indigo-800"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
