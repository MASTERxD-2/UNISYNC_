"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";  
import { useSession } from "next-auth/react";


export default function CreateEventPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    location: "",
    visibility: "public",
    event_type: "general",
    is_recurring: false,
    recurrence_pattern: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const updatedValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;
  
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("calendar");
    } else {
      alert("Failed to create event");
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-900 py-3.5 px-6 w-full lg:shadow-none shadow-sm fixed z-50">
        <div className="flex items-center justify-between gap-1 sm:gap-6 lg:flex-row flex-col">
          <div className="flex justify-between items-center lg:w-auto w-full">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <span className="ml-3 text-xl">UNISYNC</span>
                    </a>
            <button
              id="navbar-toggle"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id="mobile-navbar"
            className="hidden lg:flex flex-row w-full flex-1"
          >
            <ul className="text-center flex lg:flex-row flex-col lg:gap-2 xl:gap-4 gap-2 items-center lg:ml-auto">
            <li>
              <Link
                href="/ui/dashboard"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/ui/department"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Department
              </Link>
            </li>
            <li>
              <Link
                href="/ui/calendar"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href="/ui/tasksandreminders"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Tasks & Reminders
              </Link>
            </li>
            <li>
              <Link
                href="/ui/profile"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/ui/about"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                About
              </Link>
            </li>
          </ul>
            <div className="text-center lg:flex items-center gap-1 sm:gap-4 lg:ml-auto">
              <div className="flex items-center lg:justify-start justify-center gap-1 sm:gap-2">
                <div className="relative w-max p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5001 17.5L15.4167 15.4167M15.8334 9.16667C15.8334 5.48477 12.8486 2.5 9.16673 2.5C5.48483 2.5 2.50006 5.48477 2.50006 9.16667C2.50006 12.8486 5.48483 15.8333 9.16673 15.8333C11.0006 15.8333 12.6615 15.0929 13.8668 13.8947C15.0814 12.6872 15.8334 11.0147 15.8334 9.16667Z"
                      stroke="#6B7280"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-gray-200 dark:text-gray-700 font-normal">|</p>
                <button className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center lg:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M11.3235 2.5H9.16667C6.02397 2.5 4.45262 2.5 3.47631 3.47631C2.5 4.45262 2.5 6.02397 2.5 9.16667V10.8333C2.5 13.976 2.5 15.5474 3.47631 16.5237C4.45262 17.5 6.02397 17.5 9.16667 17.5H10.8333C13.976 17.5 15.5474 17.5 16.5237 16.5237C17.5 15.5474 17.5 13.976 17.5 10.8333V9.55882M10 10H5.83333M12.5 13.3333H5.83333M17.5 4.58333C17.5 5.73393 16.5673 6.66667 15.4167 6.66667C14.2661 6.66667 13.3333 5.73393 13.3333 4.58333C13.3333 3.43274 14.2661 2.5 15.4167 2.5C16.5673 2.5 17.5 3.43274 17.5 4.58333Z"
                      stroke="#6B7280"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <Link href="/ui/schedule">
                <button className="group py-2 px-2 lg:pr-5 lg:pl-3.5 lg:mx-0 mx-auto flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-gray-600 bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-700">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      >
                    <path
                      d="M9 4.5V13.5M13.5 9H4.5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="max-lg:hidden">Create Event</span>
                </button>
              </Link>
              <a href="javascript:;"
                              className="group py-2 px-2 lg:pr-5 lg:pl-3.5 lg:mx-0 mx-auto flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-gray-600 bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-700"
                              onClick={() => signOut({ callbackUrl: "/ui/login" })}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                              </svg>
                              <span className="max-lg:hidden">Logout</span>
                            </a>
            </div>
          </div>
        </div>
      </nav>

    {/* Main Content */}
    <div className="pt-[68px]">
        <div className="py-3.5 lg:px-8 px-3 bg-gray-50 dark:bg-gray-800">
            <div className="block max-lg:pl-6">
            <h6 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap mb-1.5">
              Welcome back,{' '}
              <span className="text-gray-600 text-base sm:text-lg font-semibold">
                {session?.user?.name || 'User'}
              </span>
            </h6>
                <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Calendar
                </p>
            </div>
            <section className="py-24 relative">
  <div className="w-full max-w-4xl px-4 md:px-5 lg:px-5 mx-auto">
    <div className="w-full flex-col justify-start items-start gap-8 flex">
      {/* Heading */}
      <div className="w-full flex-col justify-center items-center gap-4 flex">
        <h2 className="text-center text-gray-900 text-4xl font-bold">Add New Event</h2>
        <p className="max-w-2xl text-center text-gray-500 text-base">
          Fill out the form below to add an event to the university calendar.
        </p>
      </div>

      {/* Event Name */}
      <div className="w-full px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">Event Name</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., AI Research Symposium"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
          />
        </div>
        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">Event Description</label>
          <textarea
            name="description"
            placeholder="Add a brief description of the event"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
            rows={4}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">Start Date & Time</label>
          <input
            type="datetime-local"
            name="start_time"
            required
            value={formData.start_time}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
          />
        </div>
        <div className="flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">End Date & Time</label>
          <input
              type="datetime-local"
              name="end_time"
              required
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
            />
        </div>
      </div>
        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g., Main Auditorium"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
          />
        </div>

        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <label className="text-gray-600 text-base font-medium">Event Type</label>
          <select
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
          >
            <option value="general">General</option>
            <option value="meeting">Meeting</option>
            <option value="class">Class</option>
          </select>
        </div>
        
        <div className="w-full flex-row items-center gap-2 flex">
          <input
            type="checkbox"
            name="is_recurring"
            checked={formData.is_recurring}
            onChange={handleChange}
            className="accent-blue-600 w-5 h-5"
          />
          <label className="text-gray-700 text-base font-medium">Recurring Event</label>
        </div>

        {formData.is_recurring && (
          <div className="w-full flex-col justify-start items-start gap-3 flex">
            <label className="text-gray-600 text-base font-medium">Recurrence Pattern</label>
            <input
              type="text"
              name="recurrence_pattern"
              placeholder="e.g., Every Monday"
              value={formData.recurrence_pattern}
              onChange={handleChange}
              className="w-full px-7 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none text-gray-900"
            />
          </div>
        )}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition"
          >
            Create Event
          </button>
      </form>
    </div>
    </div>
  </div>
</section>

        </div>
    </div>

    <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
        <span className="ml-3 text-xl">UNISYNC</span>
      </a>
      <p className="mt-2 text-sm font-semibold text-gray-500">Revolutionary way to build the Organisations</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ABOUT</h2>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">LICENSE AGREEMENT</h2>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">TERMS AND CONDITIONS</h2>
      </div>
    </div>
  </div>
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2025 UNISYNC —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">All Rights Reserverd.</a>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>
</div>
  );
}
