import { NextRequest, NextResponse } from 'next/server';
import { getGoogleCalendarClient } from '../../../lib/googleCalendar';
import pool from '../../../lib/db';
import { getSession } from 'next-auth/react'; // To retrieve the session and the user's access token
import type { Session } from 'next-auth'; // Import Session to type the session object

export async function POST(req: NextRequest) {
  try {
    // Extract headers as a plain object for compatibility
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Get the session, which includes the user's access token
    const session = await getSession({ req: { headers } }) as Session | null; // Pass headers as a plain object

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const accessToken = session.user.accessToken; // Extract the access token from the session

    // Get the Google Calendar client with the access token
    const calendar = await getGoogleCalendarClient(accessToken);

    // Fetch events from the database
    const { rows } = await pool.query(`
      SELECT title, description, start_time, end_time, location
      FROM events
      WHERE visibility = 'public'
    `);

    // Sync each event to the Google Calendar
    for (const event of rows) {
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: event.title,
          description: event.description,
          start: {
            dateTime: new Date(event.start_time).toISOString(),
            timeZone: 'UTC',
          },
          end: {
            dateTime: new Date(event.end_time).toISOString(),
            timeZone: 'UTC',
          },
          location: event.location,
        },
      });
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Calendar sync failed' }, { status: 500 });
  }
}
