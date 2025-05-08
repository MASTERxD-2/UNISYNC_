import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

import GoogleProvider from 'next-auth/providers/google';
// This is the function you were trying to import
export const getGoogleCalendarClient = (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2() as OAuth2Client;
  oauth2Client.setCredentials({ access_token: accessToken });

  return google.calendar({ version: 'v3', auth: oauth2Client });
};

export const getCalendarEvents = async (accessToken: string) => {
  const calendar = getGoogleCalendarClient(accessToken);

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return res.data.items;
};


export const createCalendarEvent = async (accessToken: string, eventDetails: any) => {
  const calendar = getGoogleCalendarClient(accessToken);
  
  const event = {
    summary: eventDetails.title,
    location: eventDetails.location,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: 'America/Los_Angeles',
    },
    reminders: {
      useDefault: true,
    },
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });
  
  return res.data;
};
