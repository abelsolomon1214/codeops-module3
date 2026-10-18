import { orderSchema } from "@/lib/orderSchema";
import { createOrder, getSession, listOrders } from "@/lib/ordersStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const orders = await listOrders();
  return Response.json(orders, { status: 200 });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Malformed JSON request body" },
      { status: 400 },
    );
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const session = await getSession();
  const order = await createOrder(result.data, session?.id ?? "user_abel");

  return Response.json(order, { status: 201 });
}
