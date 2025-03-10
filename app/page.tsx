"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Page() {
  const [date, setDate] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDate(new Date());
  }, []);

  const handleDateChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setDate(value[0]);
    } else {
      setDate(null);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443"
              />
            </svg>
            <span className="ml-3 text-xl">UNISYNC</span>
          </a>
        </div>
        <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            {/* content - start */}
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-black-500 md:mb-6 md:text-lg xl:text-xl">Mahindra University</p>
                <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
                  Revolutionary way to build the Organisations
                </h1>
              <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
              Ethics and equity and principles of justice do not change with the calendar.
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <a href="#" className="inline-block rounded-lg bg-black px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                  Login
                </a>

                <a href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                  Regitser
                </a>
              </div>
            </div>
            {/* content - end */}

            {/* image - start */}
            <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
              <img src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?auto=format&q=75&fit=crop&w=1000" loading="lazy" alt="Photo by Fakurian Design" className="h-full w-full object-cover object-center" />
      </div>
      {/* image - end */}
    </section>
  </div>
</div>

      </div>
      <footer className="text-gray-600 body-font mt-auto">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center text-gray-900">
            <span className="ml-3 text-xl">UNISYNC</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200">
            © 2025 UNISYNC — All Rights Reserved
          </p>
        </div>
      </footer>
    </main>
  );
}
