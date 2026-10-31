"use client";

import Link from "next/link";
import { etb, when } from "@/lib/format";
import { toCsv, downloadCsv } from "@/lib/csv";
import type { OrderRecord } from "@/lib/ordersStore";

interface OrderTableProps {
  orders: OrderRecord[];
  page: number;
  totalPages: number;
  sort: string;
  dir: string;
}

export default function OrderTable({
  orders,
  page,
  totalPages,
  sort,
  dir,
}: OrderTableProps) {
  const buildSortUrl = (field: string) => {
    const nextDir = sort === field && dir === "asc" ? "desc" : "asc";
    return "/orders?page=1&sort=" + field + "&dir=" + nextDir;
  };

  const ariaSortValue = (field: string) => {
    if (sort !== field) return "none";
    return dir === "asc" ? "ascending" : "descending";
  };

  const handleExportCsv = () => {
    if (orders.length === 0) return;

    const flattened = orders.flatMap((order) =>
      order.items.map((item) => ({
        "Order ID": order.id,
        "Customer Name": order.customerName,
        "Phone Number": order.phone,
        "Delivery Address": order.address,
        "Customer Notes": order.notes || "None",
        "Order Date": when.format(new Date(order.createdAt)),
        Status: order.status,
        "Item Name": item.name,
        "Unit Price": item.price,
        Quantity: item.quantity,
        Subtotal: item.price * item.quantity,
        "Delivery Fee": order.deliveryFee,
        "Total (ETB)": etb.format(order.total),
      }))
    );

    const csvContent = toCsv(flattened);
    downloadCsv(csvContent, "AddisEats-Orders-Page-" + page + ".csv");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
          Showing page {page} of {totalPages}
        </p>
        <button
          onClick={handleExportCsv}
          type="button"
          style={{
            padding: "0.4rem 0.85rem",
            backgroundColor: "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "0.875rem",
          }}
        >
          <caption style={{ textAlign: "left", padding: "0.5rem 0", color: "#64748b", fontSize: "0.75rem" }}>
            Order History Table with Sortable Columns and Live Tracking Links
          </caption>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
              <th scope="col" style={{ padding: "0.75rem" }}>Order ID</th>
              <th scope="col" aria-sort={ariaSortValue("createdAt")} style={{ padding: "0.75rem" }}>
                <Link href={buildSortUrl("createdAt")} style={{ color: "inherit", textDecoration: "none" }}>
                  Date {sort === "createdAt" ? (dir === "asc" ? "▲" : "▼") : ""}
                </Link>
              </th>
              <th scope="col" style={{ padding: "0.75rem" }}>Customer</th>
              <th scope="col" aria-sort={ariaSortValue("status")} style={{ padding: "0.75rem" }}>
                <Link href={buildSortUrl("status")} style={{ color: "inherit", textDecoration: "none" }}>
                  Status {sort === "status" ? (dir === "asc" ? "▲" : "▼") : ""}
                </Link>
              </th>
              <th scope="col" aria-sort={ariaSortValue("total")} style={{ padding: "0.75rem", textAlign: "right" }}>
                <Link href={buildSortUrl("total")} style={{ color: "inherit", textDecoration: "none" }}>
                  Total {sort === "total" ? (dir === "asc" ? "▲" : "▼") : ""}
                </Link>
              </th>
              <th scope="col" style={{ padding: "0.75rem", textAlign: "center" }}>Live Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600, fontFamily: "monospace" }}>{o.id}</td>
                <td style={{ padding: "0.75rem", color: "#475569" }}>
                  {when.format(new Date(o.createdAt))}
                </td>
                <td style={{ padding: "0.75rem" }}>{o.customerName}</td>
                <td style={{ padding: "0.75rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor: o.status === "Confirmed" ? "#dcfce7" : "#fee2e2",
                      color: o.status === "Confirmed" ? "#166534" : "#991b1b",
                    }}
                  >
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: 700, color: "#0f766e" }}>
                  {etb.format(o.total)}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  <Link
                    href={"/track/" + o.id}
                    style={{
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      color: "#0f766e",
                      textDecoration: "none",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    Track Live 🗺️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
        <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Page {page} of {totalPages}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {page > 1 ? (
            <Link
              href={"/orders?page=" + (page - 1) + "&sort=" + sort + "&dir=" + dir}
              style={{ padding: "0.375rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.375rem", textDecoration: "none", color: "#334155" }}
            >
              Previous
            </Link>
          ) : (
            <span style={{ padding: "0.375rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: "0.375rem", color: "#94a3b8" }}>
              Previous
            </span>
          )}

          {page < totalPages ? (
            <Link
              href={"/orders?page=" + (page + 1) + "&sort=" + sort + "&dir=" + dir}
              style={{ padding: "0.375rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.375rem", textDecoration: "none", color: "#334155" }}
            >
              Next
            </Link>
          ) : (
            <span style={{ padding: "0.375rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: "0.375rem", color: "#94a3b8" }}>
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
