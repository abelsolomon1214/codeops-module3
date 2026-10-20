"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface OrderStatusClientProps {
  id: string;
  initialData: any;
}

export default function OrderStatusClient({ id, initialData }: OrderStatusClientProps) {
  const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialData,
    refreshInterval: 5000, // Poll every 5 seconds in the background
    revalidateOnFocus: true,
  });

  if (isLoading && !data) return <p>Loading live status...</p>;
  if (error) return <p style={{ color: "red" }}>Could not load order status.</p>;

  return (
    <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #ddd" }}>
      <p><strong>Order ID:</strong> {data.id}</p>
      <p><strong>Customer:</strong> {data.name} ({data.phone})</p>
      <p><strong>Status:</strong> <span style={{ color: "green", fontWeight: "bold" }}>{data.status}</span></p>
      <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "1rem" }}>
        🔄 Polling active (updates every 5s in background).
      </p>
    </div>
  );
}
