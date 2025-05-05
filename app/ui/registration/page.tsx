'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    user_id: '',
    department_id: '',
    role: '',
    password: '',
    confirm_password: '',
    notes: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok && data.redirect) {
      router.push(data.redirect);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-2 text-center">Register</h1>
      <p className="text-gray-600 text-center mb-6">Create your account to get started.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name*" required onChange={handleChange} className="p-2 border w-full" />
        <input type="email" name="email" placeholder="Email*" required onChange={handleChange} className="p-2 border w-full" />
        <input name="user_id" placeholder="User ID*" required onChange={handleChange} className="p-2 border w-full" />
        <input name="department_id" placeholder="Department ID*" required onChange={handleChange} className="p-2 border w-full" />

        <select name="role" required onChange={handleChange} className="p-2 border w-full">
          <option value="">Select Role*</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>

        <input type="password" name="password" placeholder="Password*" required onChange={handleChange} className="p-2 border w-full" />
        <input type="password" name="confirm_password" placeholder="Confirm Password*" required onChange={handleChange} className="p-2 border w-full" />
        <textarea name="notes" placeholder="Notes*" required onChange={handleChange} className="p-2 border w-full h-24" />

        <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Register</button>
      </form>

      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
    </div>
  );
}
