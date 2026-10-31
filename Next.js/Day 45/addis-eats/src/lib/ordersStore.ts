import { cookies } from "next/headers";
import type { OrderInput } from "./orderSchema";

export type OrderItemRecord = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type OrderRecord = {
  id: string;
  userId: string;
  customerName: string;
  phone: string;
  address: string;
  notes: string;
  items: OrderItemRecord[];
  deliveryFee: number;
  total: number;
  currency: "ETB";
  status: "Confirmed" | "Cancelled";
  createdAt: string;
};

export type SessionUser = {
  id: string;
  name: string;
};

const DELIVERY_FEE = 50;

const defaultDemoItems: OrderItemRecord[] = [
  { id: 1, name: "Shiro", price: 180, quantity: 1 },
  { id: 2, name: "Tibs", price: 350, quantity: 1 },
];

declare global {
  var __addisEatsOrders: OrderRecord[] | undefined;
  var __addisEatsOrderSeq: number | undefined;
}

const initialOrders: OrderRecord[] = [
  {
    id: "ord_1001",
    userId: "user_hana",
    customerName: "Hana Tesfaye",
    phone: "+251911223344",
    address: "Bole Atlas, near Edna Mall",
    notes: "Extra injera please.",
    items: [{ id: 3, name: "Beyaynetu", price: 250, quantity: 1 }],
    deliveryFee: DELIVERY_FEE,
    total: 300,
    currency: "ETB",
    status: "Confirmed",
    createdAt: "2026-10-18T08:15:00.000Z",
  },
  {
    id: "ord_1002",
    userId: "user_abel",
    customerName: "Abel Solomon",
    phone: "0912345678",
    address: "Kazanchis, Addis Ababa",
    notes: "Call on arrival.",
    items: defaultDemoItems,
    deliveryFee: DELIVERY_FEE,
    total: 580,
    currency: "ETB",
    status: "Confirmed",
    createdAt: "2026-10-18T09:30:00.000Z",
  },
];

function getStore(): OrderRecord[] {
  if (!globalThis.__addisEatsOrders) {
    globalThis.__addisEatsOrders = [...initialOrders];
  }
  return globalThis.__addisEatsOrders;
}

function nextOrderId(): string {
  if (!globalThis.__addisEatsOrderSeq) {
    globalThis.__addisEatsOrderSeq = 1042;
  } else {
    globalThis.__addisEatsOrderSeq += 1;
  }
  return `ord_${globalThis.__addisEatsOrderSeq}`;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  if (sessionCookie === "user_hana") {
    return { id: "user_hana", name: "Hana Tesfaye" };
  }

  return {
    id: sessionCookie,
    name: "Abel Solomon",
  };
}

export async function listOrders(): Promise<OrderRecord[]> {
  return [...getStore()];
}

export async function getOrderById(orderId: string): Promise<OrderRecord | undefined> {
  return getStore().find((order) => order.id === orderId);
}

export async function createOrder(
  input: OrderInput,
  userId = "user_abel",
): Promise<OrderRecord> {
  // Server-only secret remains exclusively on the server
  const hasServerSecret = Boolean(process.env.TELEBIRR_SECRET);
  void hasServerSecret;

  const items =
    input.items && input.items.length > 0 ? input.items : defaultDemoItems;

  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const newOrder: OrderRecord = {
    id: nextOrderId(),
    userId,
    customerName: input.name,
    phone: input.phone,
    address: input.address,
    notes: input.notes ?? "",
    items,
    deliveryFee: DELIVERY_FEE,
    total: itemsSubtotal + DELIVERY_FEE,
    currency: "ETB",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  getStore().unshift(newOrder);
  return newOrder;
}

export async function markOrderCancelled(orderId: string): Promise<OrderRecord> {
  const store = getStore();
  const order = store.find((item) => item.id === orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "Cancelled";
  return order;
}

export function getAllOrders(): OrderRecord[] {
  return [...getStore()];
}

export function getOrdersForUser(userId: string): OrderRecord[] {
  return getStore().filter((order) => order.userId === userId);
}
