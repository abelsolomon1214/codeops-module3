"use client";

import dynamic from "next/dynamic";
import type { DeliveryMapProps } from "./DeliveryMapLeaf";

const DeliveryMap = dynamic(() => import("./DeliveryMapLeaf"), {
  ssr: false,
  loading: () => (
    <div
      tabIndex={0}
      aria-label="Loading map representation"
      style={{
        height: "360px",
        width: "100%",
        backgroundColor: "#f1f5f9",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        fontSize: "0.875rem",
      }}
    >
      <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🗺️</div>
      <span>Loading live Addis Ababa delivery map...</span>
    </div>
  ),
});

export default function MapPanel(props: DeliveryMapProps) {
  return <DeliveryMap {...props} />;
}
