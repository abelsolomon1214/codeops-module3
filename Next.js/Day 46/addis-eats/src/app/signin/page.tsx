"use client";

import Link from "next/link";
import { useActionState, use } from "react";
import { signInAction } from "@/app/actions";

export default function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const next = resolvedParams?.next || "/menu";
  const [state, formAction, pending] = useActionState(signInAction, null);

  return (
    <div style={{ maxWidth: "440px", margin: "3rem auto", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Sign in to Addis Eats</h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        Enter your details to access your account and orders.
      </p>

      {state?.error && (
        <div style={{ padding: "0.75rem", background: "#fee2e2", color: "#991b1b", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="hidden" name="next" value={next} />

        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.9rem", fontWeight: 600 }}>
          Email address
          <input
            type="email"
            name="email"
            required
            placeholder="abel@example.com"
            style={{ padding: "0.6rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "1rem" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.9rem", fontWeight: 600 }}>
          Password
          <input
            type="password"
            name="password"
            required
            placeholder="password123"
            style={{ padding: "0.6rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "1rem" }}
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          style={{
            marginTop: "0.5rem",
            padding: "0.75rem",
            background: "#b91c1c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: pending ? "not-allowed" : "pointer",
          }}
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "#6b7280" }}>
        Do not have an account?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} style={{ color: "#2563eb", fontWeight: 600 }}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
