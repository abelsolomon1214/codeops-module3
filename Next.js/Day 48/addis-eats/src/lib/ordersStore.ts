import fs from "fs";
import path from "path";
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

const DELIVERY_FEE = 50;

const defaultDemoItems: OrderItemRecord[] = [
  { id: 1, name: "Shiro", price: 180, quantity: 1 },
  { id: 2, name: "Tibs", price: 350, quantity: 1 },
];

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

const dataDir = path.join(process.cwd(), ".data");
const ordersFile = path.join(dataDir, "orders.json");

function ensureFile(): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify(initialOrders, null, 2), "utf-8");
  }
}

function readOrdersFromDisk(): OrderRecord[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(ordersFile, "utf-8");
    return JSON.parse(raw) as OrderRecord[];
  } catch {
    return initialOrders;
  }
}

function writeOrdersToDisk(orders: OrderRecord[]): void {
  ensureFile();
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), "utf-8");
}

function nextOrderId(orders: OrderRecord[]): string {
  const highest = orders.reduce((max, o) => {
    const num = parseInt(o.id.replace("ord_", ""), 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 1040);
  return `ord_${highest + 1}`;
}

export async function listOrders(): Promise<OrderRecord[]> {
  return readOrdersFromDisk();
}

export async function getOrderById(orderId: string): Promise<OrderRecord | undefined> {
  const orders = readOrdersFromDisk();
  return orders.find((order) => order.id === orderId);
}

export async function createOrder(
  input: OrderInput,
  userId = "user_abel",
): Promise<OrderRecord> {
  const orders = readOrdersFromDisk();

  const items =
    input.items && input.items.length > 0 ? input.items : defaultDemoItems;

  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const newOrder: OrderRecord = {
    id: nextOrderId(orders),
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

  orders.unshift(newOrder);
  writeOrdersToDisk(orders);
  return newOrder;
}

export async function markOrderCancelled(orderId: string): Promise<OrderRecord> {
  const orders = readOrdersFromDisk();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "Cancelled";
  writeOrdersToDisk(orders);
  return order;
}

export function getAllOrders(): OrderRecord[] {
  return readOrdersFromDisk();
}

export function getOrdersForUser(userId: string): OrderRecord[] {
  const orders = readOrdersFromDisk();
  return orders.filter((order) => order.userId === userId || !order.userId);
}
