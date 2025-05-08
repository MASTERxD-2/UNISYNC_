// lib/session.ts
import { SessionOptions } from "iron-session";

export interface UserSession {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "unisync_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
