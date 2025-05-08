import { NextResponse } from "next/server";
import { Pool } from "pg";

// Use a pool, not a single client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

      // Replace this with bcrypt.compare() if using hashed passwords
      const isPasswordCorrect = password === user.password;

      if (isPasswordCorrect) {
        return NextResponse.json({
          message: "Login successful",
          user: {
            id: user.user_id,
            name: user.name,       // ✅ Include name
            email: user.email,
          },
        });
      } else {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
