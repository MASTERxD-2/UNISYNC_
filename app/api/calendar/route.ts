import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Replace with your actual connection string
const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`
      SELECT event_id, title, start_time, end_time 
      FROM events 
      WHERE visibility = 'public'
      ORDER BY start_time ASC
    `;

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error fetching events:', err);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
