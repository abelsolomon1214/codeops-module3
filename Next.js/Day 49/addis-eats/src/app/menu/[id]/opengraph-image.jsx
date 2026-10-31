import { ImageResponse } from "next/og";
import { getDish } from "@/lib/api";

export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id) || { name: "Addis Eats", price: "" };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A1F3D",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: "#FBBF24", textTransform: "uppercase", letterSpacing: "2px" }}>
          Addis Eats · Addis Ababa
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ fontSize: 64, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            {dish.name}
          </h1>
          {dish.price && (
            <p style={{ fontSize: 40, fontWeight: 700, color: "#FBBF24", margin: 0 }}>
              {dish.price} ETB
            </p>
          )}
        </div>

        <div style={{ fontSize: 20, color: "#94A3B8" }}>
          Delivered across Addis Ababa
        </div>
      </div>
    ),
    { ...size }
  );
}
