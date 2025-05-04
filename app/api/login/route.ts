// pages/api/login/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// import { createClient } from '@neondatabase/serverless'; // Corrected Neon import
import jwt from 'jsonwebtoken';

// Create a direct instance of the Neon client
// const neon = createClient({
//   connectionString: process.env.NEON_DB_CONNECTION_STRING, // Connection string from environment variables
// });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle only POST requests for login
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Query the database for the user by email
    const result = await neon.query('SELECT * FROM users WHERE email = $1', [email]);

    // Check if the user exists
    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password stored in the database
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token with the user's ID and role
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set the JWT token as an HttpOnly cookie (for security reasons)
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

    // Redirect based on the user role
    if (user.role === 'admin') {
      return res.status(200).json({ success: true, redirect: '/admin/dashboard' });
    } else {
      return res.status(200).json({ success: true, redirect: '/user/dashboard' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
