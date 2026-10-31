"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MapPanel from "./MapPanel";
import { etb, when, formatRelativeTime } from "@/lib/format";
import { toCsv, downloadCsv } from "@/lib/csv";
import type { OrderRecord } from "@/lib/ordersStore";

interface TrackingClientProps {
  initialOrder: OrderRecord;
}

type ConnectionState = "connecting" | "live" | "reconnecting" | "closed";

export default function TrackingClient({ initialOrder }: TrackingClientProps) {
  const [orderState, setOrderState] = useState({
    status: initialOrder.status as string,
    courier: {
      name: "Almaz Kebede",
      phone: "+251 91 123 4567",
      position: [8.988, 38.782] as [number, number],
    },
    destination: {
      address: initialOrder.address,
      position: [8.995, 38.7896] as [number, number],
    },
    estimatedArrival: new Date(Date.now() + 18 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [connState, setConnState] = useState<ConnectionState>("connecting");

  useEffect(() => {
    let es: EventSource | null = null;
    let isMounted = true;

    // Delay EventSource instantiation until after the browser finishes the primary document load
    // This immediately stops the browser's tab reload spinner.
    const timer = setTimeout(() => {
      if (!isMounted) return;

      try {
        es = new EventSource("/api/orders/" + initialOrder.id + "/stream");

        es.onopen = () => {
          if (isMounted) setConnState("live");
        };

        es.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const payload = JSON.parse(event.data);
            setOrderState((prev) => ({
              ...prev,
              ...payload,
            }));
            if (payload.status === "Delivered") {
              setConnState("closed");
              if (es) {
                es.close();
                es = null;
              }
            }
          } catch {}
        };

        es.onerror = () => {
          if (!isMounted) return;
          if (es && es.readyState === EventSource.CLOSED) {
            setConnState("closed");
          } else {
            setConnState("reconnecting");
          }
        };
      } catch {
        setConnState("closed");
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (es) {
        es.close();
        es = null;
      }
    };
  }, [initialOrder.id]);

  const handleExportCsv = () => {
    const exportRows = initialOrder.items.map((item) => ({
      "Order ID": initialOrder.id,
      "Order Date": when.format(new Date(initialOrder.createdAt)),
      "Customer Name": initialOrder.customerName,
      "Delivery Address": initialOrder.address,
      "Customer Notes": initialOrder.notes || "None, standard delivery",
      "Dish Item": item.name,
      "Unit Price (ETB)": item.price,
      Quantity: item.quantity,
      "Subtotal (ETB)": item.price * item.quantity,
      "Total Amount": etb.format(initialOrder.total),
      "Current Status": orderState.status,
      "Courier Name": orderState.courier.name,
    }));

    const csvContent = toCsv(exportRows);
    downloadCsv(csvContent, "AddisEats-Order-" + initialOrder.id + ".csv");
  };

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "1.5rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <Link
            href="/orders"
            style={{
              color: "#0f766e",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              minHeight: "44px",
            }}
          >
            &larr; Back to Order History
          </Link>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.5rem 0 0.25rem 0", color: "#0f172a" }}>
            Live Delivery Tracking: {initialOrder.id}
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>
            Placed {when.format(new Date(initialOrder.createdAt))} ({formatRelativeTime(initialOrder.createdAt)})
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.375rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor:
                connState === "live"
                  ? "#dcfce7"
                  : connState === "reconnecting"
                  ? "#fef9c3"
                  : "#f1f5f9",
              color:
                connState === "live"
                  ? "#166534"
                  : connState === "reconnecting"
                  ? "#854d0e"
                  : "#475569",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor:
                  connState === "live"
                    ? "#22c55e"
                    : connState === "reconnecting"
                    ? "#eab308"
                    : "#94a3b8",
              }}
            />
            {connState === "live"
              ? "Live Stream"
              : connState === "reconnecting"
              ? "Reconnecting..."
              : connState === "connecting"
              ? "Connecting..."
              : "Stream Closed"}
          </div>

          <button
            onClick={handleExportCsv}
            type="button"
            style={{
              minHeight: "44px",
              minWidth: "44px",
              padding: "0.5rem 0.875rem",
              backgroundColor: "#0f766e",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Export Order CSV
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        <section
          aria-labelledby="map-heading"
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "0.75rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 id="map-heading" style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: 0, marginBottom: "0.75rem", color: "#1e293b" }}>
            Live Courier Route Map
          </h2>
          <MapPanel
            courierPos={orderState.courier.position}
            destPos={orderState.destination.position}
            courierName={orderState.courier.name}
            destinationAddress={orderState.destination.address}
          />
        </section>

        <section
          aria-labelledby="accessible-info-heading"
          style={{
            backgroundColor: "white",
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 id="accessible-info-heading" style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: 0, marginBottom: "1rem", color: "#1e293b" }}>
              Delivery Details in Words
            </h2>

            <div style={{ marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#64748b", fontWeight: 700 }}>
                Status
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f766e", marginTop: "0.25rem" }}>
                {orderState.status}
              </div>
            </div>

            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <dt style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Estimated Arrival</dt>
                <dd style={{ margin: "0.25rem 0 0 0", fontWeight: 700, color: "#0f172a" }}>
                  {when.format(new Date(orderState.estimatedArrival))}
                </dd>
              </div>

              <div>
                <dt style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Courier Assigned</dt>
                <dd style={{ margin: "0.25rem 0 0 0", fontWeight: 700, color: "#0f172a" }}>
                  {orderState.courier.name}
                </dd>
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <dt style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Delivery Destination</dt>
                <dd style={{ margin: "0.25rem 0 0 0", color: "#334155" }}>
                  {initialOrder.address}
                </dd>
              </div>

              <div>
                <dt style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Total Order Value</dt>
                <dd style={{ margin: "0.25rem 0 0 0", fontWeight: 700, color: "#0f766e" }}>
                  {etb.format(initialOrder.total)}
                </dd>
              </div>

              <div>
                <dt style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Customer Name</dt>
                <dd style={{ margin: "0.25rem 0 0 0", color: "#334155" }}>
                  {initialOrder.customerName}
                </dd>
              </div>
            </dl>
          </div>

          <div style={{ marginTop: "1.25rem", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem", fontSize: "0.8125rem", color: "#64748b" }}>
            Coordinates: Lat {orderState.courier.position[0]}, Lng {orderState.courier.position[1]} &bull; Updated{" "}
            {when.format(new Date(orderState.updatedAt))}
          </div>
        </section>
      </div>

      <section
        style={{
          marginTop: "1.5rem",
          backgroundColor: "white",
          padding: "1.25rem",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "1rem", fontWeight: 600 }}>Ordered Items</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {initialOrder.items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #f8fafc",
                fontSize: "0.875rem",
              }}
            >
              <span>
                <strong>{item.quantity}x</strong> {item.name}
              </span>
              <span style={{ fontWeight: 600 }}>{etb.format(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
