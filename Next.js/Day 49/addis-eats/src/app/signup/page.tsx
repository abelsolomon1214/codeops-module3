"use client";

import Link from "next/link";
import { useActionState, use } from "react";
import { signUpAction } from "@/app/actions";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const next = resolvedParams?.next || "/menu";
  const [state, formAction, pending] = useActionState(signUpAction, null);

  return (
    <div style={{ maxWidth: "440px", margin: "3rem auto", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Create your account</h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        Sign up to save delivery addresses and place Addis Eats orders.
      </p>

      {state?.error && (
        <div style={{ padding: "0.75rem", background: "#fee2e2", color: "#991b1b", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="hidden" name="next" value={next} />

        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.9rem", fontWeight: 600 }}>
          Full name
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Abel Solomon"
            style={{ padding: "0.6rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "1rem" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.9rem", fontWeight: 600 }}>
          Email address
          <input
            type="email"
            name="email"
            required
            placeholder="name@example.com"
            style={{ padding: "0.6rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "1rem" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.9rem", fontWeight: 600 }}>
          Password
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
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
          {pending ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "#6b7280" }}>
        Already have an account?{" "}
        <Link href={`/signin?next=${encodeURIComponent(next)}`} style={{ color: "#2563eb", fontWeight: 600 }}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
