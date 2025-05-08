// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const tasks = await sql`
      SELECT 
        task_id,
        title,
        description,
        due_date,
        priority,
        status,
        created_at
      FROM tasks
      ORDER BY due_date ASC;
    `;
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
