"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function MenuSearchAndList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [term, setTerm] = useState(initialQuery);
  const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);

  // Debounce effect (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
      setPage(1); // reset to page 1 on search change
      const params = new URLSearchParams();
      if (term) params.set("q", term);
      params.set("page", "1");
      router.replace(`/menu?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [term, router]);

  // SWR Query: uses endpoint with query/page
  const endpoint = debouncedTerm
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}&page=${page}`
    : `/api/dishes?page=${page}`;

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    keepPreviousData: true, // Prevents layout flash while fetching next page/search
  });

  const dishes = data?.dishes || data || [];

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
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search dishes (e.g. Tibs, Shiro)..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{ padding: "0.6rem", width: "100%", maxWidth: "400px", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {isLoading && <p>Loading dishes...</p>}

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {Array.isArray(dishes) && dishes.map((dish: any) => (
          <div key={dish.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", background: "#fff" }}>
            <h3>{dish.name}</h3>
            <p>{dish.price} ETB</p>
            <Link href={`/menu/${dish.id}`} style={{ color: "blue" }}>View Dish &rarr;</Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <button onClick={handlePrevPage} disabled={page === 1} style={{ padding: "0.5rem 1rem", cursor: page === 1 ? "not-allowed" : "pointer" }}>
          Previous Page
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Next Page
        </button>
      </div>
    </div>
  );
}
