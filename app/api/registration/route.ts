// app/api/registration/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      user_id,
      department_id,
      role,
      password,
      confirm_password,
      notes,
    } = await request.json();

    if (password !== confirm_password) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    await pool.query(
      `INSERT INTO users (
        user_id, name, email, department_id, role,
        password, notes, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [
        user_id,
        name,
        email,
        department_id,
        role,
        hashedPassword,
        notes,
      ]
    );

    return NextResponse.json({ message: "Registration successful", redirect: "/login" });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
