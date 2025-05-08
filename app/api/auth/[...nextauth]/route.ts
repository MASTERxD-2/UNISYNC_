// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions"; // ✅ Use alias or relative path as needed

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
