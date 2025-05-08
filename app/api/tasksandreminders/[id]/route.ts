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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    await sql`DELETE FROM events WHERE event_id = ${id}`;
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const body = await request.json();
  try {
    await sql`
      UPDATE events SET
        title = ${body.task_title},
        description = ${body.description},
        start_time = ${body.due_date},
        end_time = ${body.end_time},
        location = ${body.location},
        event_type = ${body.event_type},
        is_recurring = ${body.is_recurring},
        recurrence_pattern = ${body.recurrence_pattern},
        visibility = ${body.visibility}
      WHERE event_id = ${id}
    `;
    return NextResponse.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}