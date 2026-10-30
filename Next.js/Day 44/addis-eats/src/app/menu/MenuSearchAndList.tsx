"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSearchParams, useRouter } from "next/navigation";
import DishList from "./DishList";

export default function MenuSearchAndList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [term, setTerm] = useState(initialQuery);
  const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
      setPage(1);
      const params = new URLSearchParams();
      if (term) params.set("q", term);
      params.set("page", "1");
      router.replace(`/menu?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [term, router]);

  // SWR Query endpoint
  const endpoint = debouncedTerm
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}&page=${page}`
    : `/api/dishes?page=${page}`;

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    keepPreviousData: true,
  });

  const dishes = data?.dishes || (Array.isArray(data) ? data : []);

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const params = new URLSearchParams();
    if (debouncedTerm) params.set("q", debouncedTerm);
    params.set("page", String(nextPage));
    router.replace(`/menu?${params.toString()}`);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      const params = new URLSearchParams();
      if (debouncedTerm) params.set("q", debouncedTerm);
      params.set("page", String(prevPage));
      router.replace(`/menu?${params.toString()}`);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search dishes (e.g. Tibs, Shiro, Doro Wat)..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            width: "100%",
            maxWidth: "450px",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          }}
        />
      </div>

      {isLoading && <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Loading dishes...</p>}

      {/* Render rich Day 43 DishList with images, category badges, and Add to Cart buttons */}
      <DishList dishes={dishes} />

      <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          style={{
            padding: "0.5rem 1rem",
            cursor: page === 1 ? "not-allowed" : "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: page === 1 ? "#f3f4f6" : "#fff",
          }}
        >
          Previous Page
        </button>
        <span style={{ fontWeight: 500 }}>Page {page}</span>
        <button
          onClick={handleNextPage}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "#fff",
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
