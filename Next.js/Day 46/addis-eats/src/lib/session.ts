import { cookies } from "next/headers";
import { findUserById } from "./userStore";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const sessionData = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (sessionData && sessionData.id) {
      return sessionData;
    }
  } catch {
    // If stored as raw user ID
    const user = findUserById(token);
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
  }

  return null;
}

export async function setSession(user: SessionUser) {
  const cookieStore = await cookies();
  const token = Buffer.from(JSON.stringify(user)).toString("base64");
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
