
import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // Read the request-specific session cookie.
  const sessionCookie = (await cookies()).get("session");

  return <CheckoutForm hasSession={Boolean(sessionCookie)} />;
}
