import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/lib/ordersStore";

export default async function KitchenDashboard() {
  const user = await getSession();

  // Authentication check
  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  // Authorization check (Staff role required)
  if (user.role !== "staff") {
    return (
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "red" }}>403 — Forbidden</h1>
        <p>You do not have staff permissions to view the kitchen dashboard.</p>
      </main>
    );
  }

  const allOrders = getAllOrders();

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Kitchen Dashboard (Staff Only)</h1>
      <p>Welcome, {user.name}. Managing all active kitchen orders.</p>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
        {allOrders.map((order: any) => (
          <li key={order.id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "6px", background: "#fdfdfd" }}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Customer:</strong> {order.name} ({order.phone})</p>
            <p><strong>Status:</strong> <span style={{ color: "green", fontWeight: "bold" }}>{order.status}</span></p>
          </li>
        ))}
      </ul>
    </main>
  );
}
