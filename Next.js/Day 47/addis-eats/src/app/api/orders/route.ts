import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listOrders, createOrder } from "@/lib/ordersStore";
import { orderSchema } from "@/lib/orderSchema";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listOrders();
  const userOrders = orders.filter((o) => o.userId === session.id);
  return NextResponse.json(userOrders);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newOrder = await createOrder(parsed.data, session.id);
    return NextResponse.json(newOrder, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
