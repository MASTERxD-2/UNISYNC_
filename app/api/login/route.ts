// app/api/login/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

// Use a pool, not a single client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Replace this line with bcrypt.compare() if using hashed passwords
      const isPasswordCorrect = password === user.password;

      if (isPasswordCorrect) {
        return NextResponse.json({ message: "Login successful" });
      } else {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
