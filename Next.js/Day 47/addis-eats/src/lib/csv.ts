/**
 * Convert an array of record objects to an RFC 4180-compliant CSV string.
 * Escapes quotes, commas, and newlines correctly.
 */
export function toCsv<T extends Record<string, unknown>>(rows: T[]): string {
  if (!rows || rows.length === 0) {
    return "";
  }

  const escapeCell = (val: unknown): string => {
    const s = String(val ?? "");
    if (/[",\n\r]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const headers = Object.keys(rows[0]);
  const headerLine = headers.map(escapeCell).join(",");

  const bodyLines = rows.map((row) =>
    headers.map((key) => escapeCell(row[key])).join(",")
  );

  return [headerLine, ...bodyLines].join("\n");
}

/**
 * Browser-side download trigger using UTF-8 Blob and revokeObjectURL.
 */
export function downloadCsv(csvText: string, filename: string): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.setAttribute("download", filename);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
