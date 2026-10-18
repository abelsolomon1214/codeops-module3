import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getOrdersForUser } from "@/lib/ordersStore";
import Link from "next/link";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) {
    redirect("/signin?next=/orders");
  }

  // Layer 2 & Query Scoping: fetch ONLY orders belonging to the authenticated user ID
  const orders = getOrdersForUser(user.id);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Orders ({user.name})</h1>
      <p style={{ color: "#666" }}>Scoped securely to user ID: {user.id}</p>

      {orders.length === 0 ? (
        <p>No orders found for your account.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
          {orders.map((order: any) => (
            <li key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "6px" }}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <Link href={`/orders/${order.id}`} style={{ color: "blue" }}>View Live Status &rarr;</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
