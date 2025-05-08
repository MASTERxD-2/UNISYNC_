import { NextResponse } from 'next/server';
import { withIronSessionApiRoute } from 'iron-session';  // Correct iron-session import for API routes
import pool from '../../lib/db';  // Adjusted import path

// Define the iron-session configuration
const sessionOptions = {
  cookieName: 'UNISYNC_SESSION',
  password: process.env.SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production
  },
};

async function getUserData(userId: string) {
  try {
    const result = await pool.query('SELECT name, email FROM users WHERE user_id = $1', [userId]);
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the user data
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user data');
  }
}

async function handler(req, res) {
  const session = req.session;
  const userId = session.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await getUserData(userId);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);  // Wrap the handler with the iron-session
