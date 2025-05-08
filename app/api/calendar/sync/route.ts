

import { NextRequest, NextResponse } from 'next/server';
import { getGoogleCalendarClient } from '../../../lib/googleCalendar';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth'; // ✅ Fixed import
import { authOptions } from '../../../../utils/authOptions';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

// Connect to database
const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { providers } = body;

    console.log('Received sync request for providers:', providers);

    const session = await getServerSession({ req, ...authOptions }); // ✅ Fixed function usage

    console.log('Session exists:', !!session);
    console.log('User in session:', session?.user ? 'yes' : 'no');

    let accessToken = (session?.user as any)?.accessToken;

    if (!accessToken) {
      console.log('No access token in session, attempting to extract from cookies');
      const cookieStore = cookies(); // ✅ No await here
      const sessionCookie = cookieStore.get('next-auth.session-token')?.value;

      if (sessionCookie) {
        try {
          const decodedToken = await decode({
            token: sessionCookie,
            secret: process.env.NEXTAUTH_SECRET || '',
          });
          accessToken = decodedToken?.accessToken as string;
          console.log('Access token retrieved from cookie:', !!accessToken);
        } catch (e) {
          console.error('Failed to decode session token:', e);
        }
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        {
          error: 'User not authenticated or missing access token',
          sessionExists: !!session,
          userExists: !!session?.user,
        },
        { status: 401 }
      );
    }

    const events = await sql`
      SELECT title, description, start_time, end_time, location
      FROM events
      WHERE visibility = 'public'
    `;

    console.log(`Found ${events.length} events to sync`);

    const syncedProviders = [];
    let totalEvents = events.length;
    let successfulSyncs = 0;
    let failedEvents: any[] = [];
    let lastError: any = null;

    for (const provider of providers) {
      if (provider === 'google' && accessToken) {
        console.log('Syncing with Google Calendar');
        const calendar = getGoogleCalendarClient(accessToken);
        let stopOn401 = false;

        for (const event of events) {
          if (stopOn401) break;
          try {
            await calendar.events.insert({
              calendarId: 'primary',
              requestBody: {
                summary: event.title,
                description: event.description || '',
                start: {
                  dateTime: new Date(event.start_time).toISOString(),
                  timeZone: 'UTC',
                },
                end: {
                  dateTime: new Date(event.end_time).toISOString(),
                  timeZone: 'UTC',
                },
                location: event.location || '',
              },
            });
            successfulSyncs++;
            console.log(`Successfully added event: ${event.title}`);
          } catch (eventError: any) {
            const code = eventError?.code || eventError?.response?.status;
            if (
              code === 401 ||
              (eventError?.message && eventError.message.includes('Invalid Credentials'))
            ) {
              failedEvents.push({
                title: event.title,
                error: 'Invalid Google credentials. Please log out and log in again.',
              });
              lastError = eventError;
              stopOn401 = true;
              break;
            } else {
              failedEvents.push({
                title: event.title,
                error: eventError?.message || String(eventError),
              });
              lastError = eventError;
            }
            console.error(`Failed to add event "${event.title}":`, eventError);
          }
        }

        if (successfulSyncs > 0) {
          syncedProviders.push('google');
        }
      }
    }

    if (successfulSyncs === 0) {
      let errorMsg =
        'No events were synced. Possible authentication/permission issue or all inserts failed.';
      if (
        lastError?.code === 401 ||
        (lastError?.message && lastError.message.includes('Invalid Credentials'))
      ) {
        errorMsg =
          'Google authentication failed. Please log out and log in again to re-authorize calendar access.';
      }
      return NextResponse.json(
        {
          error: errorMsg,
          failedEvents,
          lastError: lastError?.message || String(lastError),
        },
        { status: 401 }
      );
    }

    console.log(
      `Successfully synced ${successfulSyncs} out of ${totalEvents} events with: ${syncedProviders.join(', ')}`
    );

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${successfulSyncs} out of ${totalEvents} events with ${syncedProviders.join(', ')}`,
      syncedProviders,
      eventCount: successfulSyncs,
      failedEvents,
    });
  } catch (error: any) {
    console.error('Sync failed:', error);
    return NextResponse.json(
      {
        error: 'Calendar sync failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
