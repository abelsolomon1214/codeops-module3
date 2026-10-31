"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { etb } from "@/lib/format";

export interface Dish {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  spicy?: boolean;
  vegetarian?: boolean;
}

export default function DishList({ dishes }: { dishes: Dish[] }) {
  const { addToCart } = useCart();
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>, dish: Dish) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(dish);
    setRecentlyAddedId(dish.id);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === dish.id ? null : curr));
    }, 1200);
  };

  if (!dishes || dishes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#64748b" }}>
        <p style={{ fontSize: "1.125rem", margin: 0 }}>No dishes matched your criteria.</p>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
          Try clearing filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {dishes.map((dish) => {
        const isAdded = recentlyAddedId === dish.id;

        return (
          <article
            key={dish.id}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "180px", backgroundColor: "#f1f5f9" }}>
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  display: "flex",
                  gap: "0.25rem",
                }}
              >
                {dish.spicy && (
                  <span
                    title="Spicy"
                    style={{
                      padding: "0.2rem 0.45rem",
                      backgroundColor: "rgba(220, 38, 38, 0.9)",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      borderRadius: "0.25rem",
                    }}
                  >
                    🌶️ Spicy
                  </span>
                )}
                {dish.vegetarian && (
                  <span
                    title="Vegetarian / Fasting (Tsom)"
                    style={{
                      padding: "0.2rem 0.45rem",
                      backgroundColor: "rgba(22, 101, 52, 0.9)",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      borderRadius: "0.25rem",
                    }}
                  >
                    🌱 Fasting
                  </span>
                )}
              </div>
            </div>

            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 700,
                    color: "#0f766e",
                  }}
                >
                  {dish.category}
                </span>
                <h3 style={{ margin: "0.25rem 0", fontSize: "1.125rem", fontWeight: 700, color: "#0f172a" }}>
                  <Link
                    href={"/menu/" + dish.id}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      outline: "none",
                    }}
                  >
                    {dish.name}
                  </Link>
                </h3>
              </div>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#64748b",
                  lineHeight: "1.4",
                  marginBottom: "1rem",
                  flexGrow: 1,
                }}
              >
                {dish.description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "auto",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0f766e" }}>
                  {etb.format(dish.price)}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleAdd(e, dish)}
                  aria-label={"Add " + dish.name + " to cart for " + etb.format(dish.price)}
                  style={{
                    minHeight: "44px",
                    minWidth: "44px",
                    padding: "0.5rem 1rem",
                    backgroundColor: isAdded ? "#166534" : "#0f766e",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.375rem",
                    transition: "all 150ms ease",
                  }}
                >
                  {isAdded ? "✓ Added" : "+ Add"}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
