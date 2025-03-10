"use client";

import { useState } from "react";
import "react-calendar/dist/Calendar.css";

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            <span className="ml-3 text-xl">UNISYNC</span>
          </a>
        </div>

        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            {/* Form Header */}
            <div className="mb-10 md:mb-16">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Get in touch</h2>
              <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                Fill in the details below to register.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">First name*</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div>
                <label htmlFor="last-name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Last name*</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="preferred name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Preferred Name*</label>
                <input
                  name="company"
                  value={formData.preferredname}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="subject" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">User ID*</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="subject" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Department*</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="subject" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password*</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="subject" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Confirm Password*</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Notes*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-25 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
                  required
                />
              </div>

              <div className="flex items-center justify-between sm:col-span-2">
              <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Register</button>

                <span className="text-sm text-gray-500">*Required</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center text-gray-900">
            <span className="ml-3 text-xl">UNISYNC</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200">
            © 2024 UNISYNC
          </p>
        </div>
      </footer>
    </main>
  );
}
