"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { orderSchema, type FieldErrors } from "@/lib/orderSchema";
import { getSession, setSession, clearSession } from "@/lib/session";
import { registerUser, findUserByEmail } from "@/lib/userStore";
import {
  createOrder,
  getOrderById,
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
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/checkout");
  }

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
    name: session.name,
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

  const order = await createOrder(parsed.data, session.id);

  revalidatePath("/orders");
  revalidatePath("/checkout");
  revalidatePath("/dashboard");

  return {
    ok: true,
    order,
  };
}

export async function signUpAction(_prevState: any, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const next = String(formData.get("next") ?? "/menu");

  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  try {
    const user = registerUser(name, email, password);
    await setSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err: any) {
    return { error: err.message || "Registration failed." };
  }

  revalidatePath("/", "layout");
  redirect(next.startsWith("/") ? next : "/menu");
}

export async function signInAction(_prevState: any, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const next = String(formData.get("next") ?? "/menu");

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  const user = findUserByEmail(email);
  if (!user || user.passwordHash !== password) {
    return { error: "Invalid email or password." };
  }

  await setSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  revalidatePath("/", "layout");
  redirect(next.startsWith("/") ? next : "/menu");
}

export async function signOutAction() {
  await clearSession();
  revalidatePath("/", "layout");
  redirect("/signin");
}

export async function signInAsDemoUser(userId = "user_abel") {
  const cookieStore = await cookies();
  const demoUser =
    userId === "user_hana"
      ? { id: "user_hana", name: "Hana Tesfaye", email: "hana@example.com", role: "customer" }
      : { id: "user_abel", name: "Abel Solomon", email: "abel@example.com", role: "customer" };

  await setSession(demoUser);
  revalidatePath("/orders");
  revalidatePath("/checkout");
  revalidatePath("/dashboard");
}

export async function signOutDemoUser() {
  await clearSession();
  revalidatePath("/orders");
  revalidatePath("/checkout");
  revalidatePath("/dashboard");
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
  revalidatePath("/dashboard");

  return {
    ok: true,
    orderId: updated.id,
    status: updated.status,
  };
}
