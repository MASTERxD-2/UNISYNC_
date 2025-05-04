import { NextResponse } from "next/server";
import { Client } from "pg";

// Replace with your Neon connection details
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is correctly set in your environment
});

client.connect();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json(); // Ensure it's JSON

    // Now, query your database to check for the user
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Assume password is hashed, compare hashes here
      const isPasswordCorrect = password === user.password; // Use bcrypt for password hash comparison
      if (isPasswordCorrect) {
        return NextResponse.json({ message: "Login successful" });
      } else {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
