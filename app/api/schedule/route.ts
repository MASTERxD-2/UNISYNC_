//app/api/schedule/route.ts
import { Pool } from "pg";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      start_time,
      end_time,
      location,
      visibility,
      event_type,
      is_recurring,
      recurrence_pattern,
    } = body;

    const created_by = 1; // Replace with actual user ID from session
    const created_at = new Date().toISOString();

    const result = await sql`
      INSERT INTO events (
        title, description, start_time, end_time, location,
        visibility, event_type, is_recurring, recurrence_pattern,
        created_by, created_at
      ) VALUES (
        ${title}, ${description}, ${start_time}, ${end_time}, ${location},
        ${visibility}, ${event_type}, ${is_recurring}, ${recurrence_pattern},
        ${created_by}, ${created_at}
      )
      RETURNING event_id;
    `;

    return NextResponse.json({
      message: 'Event created successfully',
      event_id: result[0].event_id,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
