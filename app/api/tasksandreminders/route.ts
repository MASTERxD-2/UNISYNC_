import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const tasks = await sql`
      SELECT 
        event_id, 
        title AS task_title, 
        description, 
        start_time AS due_date, 
        end_time,
        created_by,
        location,
        event_type,
        is_recurring,
        recurrence_pattern,
        visibility,
        created_at
      FROM events
      ORDER BY start_time ASC;
    `;

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
