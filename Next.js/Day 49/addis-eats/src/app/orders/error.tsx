"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Orders Error:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-xl mx-auto text-center space-y-4 bg-red-50 border border-red-200 rounded-xl my-8">
      <h2 className="text-xl font-bold text-red-800">Failed to load orders</h2>
      <p className="text-sm text-red-600">
        An error occurred while fetching your orders. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
