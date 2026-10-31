import { notFound, redirect } from "next/navigation";
import { getOrderById } from "@/lib/ordersStore";
import { getSession } from "@/lib/session";
import TrackingClient from "./TrackingClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrackOrderPage({ params }: PageProps) {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/orders");
  }

  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return <TrackingClient initialOrder={order} />;
}
