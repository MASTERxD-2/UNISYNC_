// app/api/login/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    const user = result[0];

    // NOTE: Replace this with proper hashed password comparison (e.g., bcrypt.compare)
    if (user.password !== password) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // TODO: Add session/cookie/token logic here as needed

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
