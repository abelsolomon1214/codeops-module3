"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "@/context/CartContext";
import { etb } from "@/lib/format";

interface CheckoutFormProps {
  hasSession?: boolean;
  userName?: string;
}

export default function CheckoutForm({ hasSession, userName = "" }: CheckoutFormProps) {
  const router = useRouter();
  const { cartItems, clearCart, isLoaded } = useCart();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    customerName: userName || "",
    phone: "",
    address: "",
    notes: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    setErrorMessage("");

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage("Please complete all required fields (Name, Phone, Address).");
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty. Add items before checking out.");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          customerName: formData.customerName.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          notes: formData.notes.trim(),
          items: cartItems.map((item: CartItem) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        };

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create order");
        }

        const data = await res.json();
        clearCart();
        router.push("/track/" + data.order.id);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    });
  };

  if (!isLoaded) {
    return (
      <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#64748b" }}>
        Loading order details...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "2rem 1rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: "#64748b", marginBottom: "1.25rem" }}>
          Browse our traditional Ethiopian specialties to place an order.
        </p>
        <button
          type="button"
          onClick={() => router.push("/menu")}
          style={{
            minHeight: "44px",
            minWidth: "44px",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      style={{
        maxWidth: "540px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="customerName"
          style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}
        >
          Full Name <span style={{ color: "#dc2626" }}>*</span>
        </label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          required
          value={formData.customerName}
          onChange={handleChange}
          placeholder="e.g. Almaz Kebede"
          style={{
            width: "100%",
            minHeight: "44px",
            padding: "0.625rem 0.875rem",
            border: "1px solid #cbd5e1",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}
        >
          Phone Number (TeleBirr / Ethio Telecom) <span style={{ color: "#dc2626" }}>*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9+ ]*"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+251 91 123 4567"
          style={{
            width: "100%",
            minHeight: "44px",
            padding: "0.625rem 0.875rem",
            border: "1px solid #cbd5e1",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        <label
          htmlFor="address"
          style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}
        >
          Delivery Neighborhood / Address <span style={{ color: "#dc2626" }}>*</span>
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g. Bole Medhanialem, House 412"
          style={{
            width: "100%",
            minHeight: "44px",
            padding: "0.625rem 0.875rem",
            border: "1px solid #cbd5e1",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}
        >
          Delivery Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="e.g. Extra injera, call upon arrival"
          style={{
            width: "100%",
            padding: "0.625rem 0.875rem",
            border: "1px solid #cbd5e1",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>
          <span>Items Subtotal:</span>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{etb.format(subtotal)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>
          <span>Delivery Fee:</span>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{etb.format(deliveryFee)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "0.5rem", fontSize: "1.125rem", fontWeight: 700, color: "#0f766e" }}>
          <span>Total to Pay:</span>
          <span>{etb.format(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          minHeight: "48px",
          minWidth: "44px",
          padding: "0.75rem 1.5rem",
          backgroundColor: isPending ? "#94a3b8" : "#0f766e",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: isPending ? "not-allowed" : "pointer",
          transition: "background-color 150ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {isPending ? "Placing order..." : "Place Order (" + etb.format(total) + ")"}
      </button>
    </form>
  );
}
