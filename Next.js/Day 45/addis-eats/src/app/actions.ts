"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { orderSchema, type FieldErrors } from "@/lib/orderSchema";
import {
  createOrder,
  getOrderById,
  getSession,
  markOrderCancelled,
  type OrderItemRecord,
  type OrderRecord,
} from "@/lib/ordersStore";

export type PlaceOrderState = {
  ok: boolean;
  error?: string;
  fieldErrors?: FieldErrors;
  order?: OrderRecord;
} | null;

export async function placeOrder(
  _prevState: PlaceOrderState,
  formData: FormData,
): Promise<PlaceOrderState> {
  const rawName = String(formData.get("name") ?? "");
  const rawPhone = String(formData.get("phone") ?? "");
  const rawAddress = String(formData.get("address") ?? "");
  const rawNotes = String(formData.get("notes") ?? "");
  const rawItemsJson = String(formData.get("itemsJson") ?? "");

  let parsedItems: OrderItemRecord[] | undefined;
  if (rawItemsJson) {
    try {
      const candidate: unknown = JSON.parse(rawItemsJson);
      if (Array.isArray(candidate) && candidate.length > 0) {
        parsedItems = candidate as OrderItemRecord[];
      }
    } catch {
      parsedItems = undefined;
    }
  }

  const parsed = orderSchema.safeParse({
    name: rawName,
    phone: rawPhone,
    address: rawAddress,
    notes: rawNotes,
    items: parsedItems,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();
  const order = await createOrder(parsed.data, session?.id ?? "user_abel");

  revalidatePath("/orders");
  revalidatePath("/checkout");

  return {
    ok: true,
    order,
  };
}

export async function cancelOrder(orderId: string) {
  const user = await getSession();

  if (!user) {
    throw new Error("401 Unauthorized: Not signed in");
  }

  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("404 Not Found: No such order");
  }

  if (order.userId !== user.id) {
    throw new Error("403 Forbidden: Not yours — you cannot cancel another customer's order");
  }

  const updated = await markOrderCancelled(orderId);
  revalidatePath("/orders");

  return {
    ok: true,
    orderId: updated.id,
    status: updated.status,
  };
}

export async function signInAsDemoUser(userId = "user_abel") {
  const cookieStore = await cookies();
  cookieStore.set("session", userId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
  revalidatePath("/orders");
  revalidatePath("/checkout");
}

export async function signOutDemoUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  revalidatePath("/orders");
  revalidatePath("/checkout");
}
