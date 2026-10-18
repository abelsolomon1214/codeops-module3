import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/ordersStore";
import OrderStatusClient from "./OrderStatusClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const initialOrder = getOrderById(id);

  if (!initialOrder) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Order Status Live Tracker</h1>
      <OrderStatusClient id={id} initialData={initialOrder} />
    </main>
  );
}
