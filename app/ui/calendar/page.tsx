"use client";

import { useRouter } from 'next/navigation';
import TaskCard2 from "@/components/TaskCard2";
import 'react-big-calendar/lib/css/react-big-calendar.css';  // Default styles for react-big-calendar
import './calendar.css';  // Your custom styles
import { momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';  // Your custom calendar styles
import { signOut } from "next-auth/react";

// Locale settings for the calendar
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formatDate = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = days[date.getDay()];
  const dateNum = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number): string => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}, ${dateNum}${getOrdinalSuffix(dateNum)} ${month}, ${year}.`;
};

// Custom Toolbar for calendar view switching
const CustomToolbar = ({ label, onView, view }: any) => (
  <div className="flex justify-between items-center mb-4">
    <div className="text-lg font-semibold">{label}</div>
    <div className="flex items-center rounded-md p-1 bg-gray-50 gap-px">
      {["day", "week", "month", "agenda"].map((v) => (
        <button
          key={v}
          onClick={() => onView(v)}  // Removed type assertion
          className={`py-2.5 px-5 rounded-lg text-sm font-medium transition-all duration-300 ${
            view === v
              ? "bg-gray-600 text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-600 hover:text-white"
          }`}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

// Custom weekday header for calendar view
const CustomWeekdayHeader = ({ label }: { label: string }) => (
  <div className="text-center text-sm font-medium text-gray-600 py-2 bg-gray-50 border-b border-gray-200">
    {label}
  </div>
);

// Type for event data
type EventType = {
  event_id: number;
  title: string;
  start: Date;
  end: Date;
};

// Type for calendar providers
type CalendarProvider = {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
};

export default function CalendarPage() {
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const { data: session } = useSession();
  
  const [events, setEvents] = useState<EventType[]>([]);
  const [view, setView] = useState<View>('month'); // Explicitly typed to match 'View' type
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null);
  const [calendarProviders, setCalendarProviders] = useState<CalendarProvider[]>([
    {
      id: 'google',
      name: 'Google Calendar',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
      connected: Boolean(session?.user && (session.user as any).accessToken),
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
      connected: false,
    },
    {
      id: 'apple',
      name: 'Apple Calendar',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Calendar_iOS.svg',
      connected: false,
    }
  ]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>(['google']);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/ui/login");
  };

  const today = new Date();
    const formattedDate = formatDate(today);
    const handleSignOut = () => {
      signOut();
    }

  // Sync calendars handler
  const handleSync = async () => {
    setSyncLoading(true);
    setSyncSuccess(null);
    
    try {
      console.log('Starting sync with providers:', selectedProviders);
      
      // Check for active session
      if (!session || !session.user) {
        console.error('No active session detected');
        alert('Please log in to sync your calendars');
        setSyncSuccess(false);
        return;
      }
      
      // Send the selected providers to be synced
      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providers: selectedProviders,
        }),
        // Ensure credentials are included to send cookies
        credentials: 'include'
      });
      
      // Get response data
      const data = await response.json();
      console.log('Sync response:', data);
      
      if (response.ok) {
        // Refresh events after sync
        const eventsResponse = await fetch('/api/calendar');
        const eventsData = await eventsResponse.json();
        
        const mappedEvents = eventsData.map((event: any) => ({
          ...event,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          title: event.title,
        }));
        
        setEvents(mappedEvents);
        setSyncSuccess(true);
        
        // Show success message with details
        console.log(`Calendar sync successful with: ${data.syncedProviders?.join(', ') || selectedProviders.join(', ')}`);
        console.log(`Synced ${data.eventCount || 'unknown number of'} events`);
        
        // Close modal after successful sync (with a delay)
        setTimeout(() => {
          setShowSyncModal(false);
        }, 1500);
      } else {
        // Handle specific error cases
        if (data.error === 'User not authenticated or missing access token') {
          console.error('Authentication error:', data);
          alert('Authentication issue. Please log out and log back in to reconnect your Google account.');
        } else {
          console.error('Sync failed with error:', data.error || 'Unknown error');
          alert(`Sync failed: ${data.error || 'Unknown error'}`);
        }
        setSyncSuccess(false);
      }
    } catch (error) {
      console.error('Calendar sync error:', error);
      alert('Error connecting to the server. Please check your internet connection and try again.');
      setSyncSuccess(false);
    } finally {
      setSyncLoading(false);
    }
  };
  
  // Toggle provider selection
  const toggleProviderSelection = (providerId: string) => {
    setSelectedProviders(prev => {
      if (prev.includes(providerId)) {
        return prev.filter(id => id !== providerId);
      } else {
        return [...prev, providerId];
      }
    });
  };

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/calendar');
      const data = await res.json();

      // Map events with correct start and end time
      const mappedEvents = data.map((event: any) => ({
        ...event,
        start: new Date(event.start_time), // Convert to Date
        end: new Date(event.end_time),     // Convert to Date
        title: event.title,
      }));

      setEvents(mappedEvents);
    };
    fetchEvents();
  }, []);

  // Custom styling for the day cells
  const dayStyleGetter = (date: Date) => ({
    className: "calendar-day custom-day", // Apply custom class for day cells
  });

  // Custom styling for events
  const eventStyleGetter = (event: EventType) => ({
    style: {
      backgroundColor: "black", // Change event box color to black
      color: "white",           // Ensure text is visible
    },
  });

  // Memoize the events to avoid unnecessary re-renders
  const memoizedEvents = useMemo(() => events, [events]);


  return (
    <div className="relative">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-900 py-3.5 px-6 w-full lg:shadow-none shadow-sm fixed z-50">
        <div className="flex items-center justify-between gap-1 sm:gap-6 lg:flex-row flex-col">
          <div className="flex justify-between items-center lg:w-auto w-full">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
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
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-gray-600 text-white"
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
              <button
                className="group py-2 px-2 lg:pr-5 lg:pl-3.5 lg:mx-0 mx-auto flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-gray-600 bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-700"
                onClick={handleLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                <span className="max-lg:hidden">Logout</span>
              </button>
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
        </div>
        <div className="w-full p-8">
        <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {formattedDate}
                  </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Of the five House Calendars, the Private Calendar is the one to which all Private Bills are referred. Private Bills deal with specific individuals, corporations, institutions, and so forth, as distinguished from public bills which deal with classes only..</p>
                </div>
        </section>
        <div className="p-2">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Calendar</h2>
                            <button 
                              onClick={() => setShowSyncModal(true)}
                              className="py-2 px-4 bg-gray-600 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                              Sync Calendars
                            </button>
                          </div>
                          <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: "700px" }} // 📏 Bigger height
                            view={view}
                            onView={setView}
                            components={{
                              toolbar: (props) => (
                                <CustomToolbar {...props} view={view} onView={setView} />
                              ),
                              month: {
                                header: ({ label }: { label: string }) => (
                                  <div className="text-center text-sm font-medium text-gray-600 py-2 bg-gray-50 border-b border-gray-200">
                                    {label}
                                  </div>
                                ),
                              },
                            }}
                          />
                        </div>
        <div className="calendar-container pt-8 px-12">
      
    </div>                                                           
    </div>
  </div>

 <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
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
      <p className="text-gray-500 text-sm text-center sm:text-left">©️ 2025 UNISYNC —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">All Rights Reserverd.</a>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>

      {/* Sync Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Sync Calendars</h3>
              <button 
                onClick={() => setShowSyncModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Select which calendars you want to sync with UNISYNC. Your events will be synced both ways.
            </p>
            
            <div className="space-y-3 mb-6">
              {calendarProviders.map(provider => (
                <div 
                  key={provider.id}
                  className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${
                    selectedProviders.includes(provider.id) 
                      ? 'border-gray-600 bg-gray-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => toggleProviderSelection(provider.id)}
                >
                  <div className="flex-shrink-0 w-10 h-10">
                    <img src={provider.icon} alt={provider.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{provider.name}</h4>
                    <p className="text-sm text-gray-500">
                      {provider.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input 
                      type="checkbox" 
                      checked={selectedProviders.includes(provider.id)}
                      readOnly
                      className="h-5 w-5 text-gray-600 rounded focus:ring-gray-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSyncModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSync}
                disabled={syncLoading || selectedProviders.length === 0}
                className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-colors ${
                  syncLoading || selectedProviders.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {syncLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Syncing...
                  </>
                ) : syncSuccess === true ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Synced!
                  </>
                ) : syncSuccess === false ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    Try Again
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Sync Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
