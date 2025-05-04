// /app/api/testdb/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@neondatabase/serverless';

export async function GET() {
  try {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    const result = await client.query('SELECT * FROM users LIMIT 1');
    await client.end();

    return NextResponse.json({ user: result.rows[0] });
  } catch (err) {
    console.error('DB Test Error:', err);
    return NextResponse.json({ error: 'DB failed' }, { status: 500 });
  }
}
