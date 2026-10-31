import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/checkout");
  }

  return (
    <main>
      <CheckoutForm hasSession={true} userName={session.name} />
    </main>
  );
}
