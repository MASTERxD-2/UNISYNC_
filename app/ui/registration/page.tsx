"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    user_id: "",
    institutional_id: "",
    role: "student",
    password: "",
    confirm_password: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("login");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
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

  <div className="sm:col-span-2">
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Full Name*</label>
    <input
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div>
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">First Name*</label>
    <input
      name="first_name"
      value={formData.first_name}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div>
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Last Name*</label>
    <input
      name="last_name"
      value={formData.last_name}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div className="sm:col-span-2">
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email*</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div>
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">User ID*</label>
    <input
      name="user_id"
      value={formData.user_id}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div>
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Institutional ID*</label>
    <input
      name="institutional_id"
      value={formData.institutional_id}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div className="sm:col-span-2">
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Role*</label>
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    >
      <option value="">Select Role</option>
      <option value="student">Student</option>
      <option value="faculty">Faculty</option>
    </select>
  </div>

  <div>
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password*</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div>
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Confirm Password*</label>
    <input
      type="password"
      name="confirm_password"
      value={formData.confirm_password}
      onChange={handleChange}
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
      required
    />
  </div>

  <div className="sm:col-span-2">
    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Notes (optional)</label>
    <textarea
      name="notes"
      value={formData.notes}
      onChange={handleChange}
      className="h-24 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring"
    />
  </div>

  <div className="flex items-center justify-between sm:col-span-2">
    <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
      Register
    </button>
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
            © 2025 UNISYNC - All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
