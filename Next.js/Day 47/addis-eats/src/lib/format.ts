/**
 * Shared internationalization formatters for Ethiopia (Addis Ababa).
 * Built once at module level to avoid re-instantiation overhead.
 */

// Currency formatter for Ethiopian Birr (ETB)
export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

// Explicit Addis Ababa time zone (UTC+3, EAT)
export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

// Relative time formatting ("12 minutes ago", "in 5 minutes")
export const relative = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

/**
 * Convenience helper to format time relative to now in minutes or hours
 */
export function formatRelativeTime(dateStringOrTimestamp: string | number | Date): string {
  const target = new Date(dateStringOrTimestamp).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((target - now) / (1000 * 60));

  if (Math.abs(diffMinutes) < 60) {
    return relative.format(diffMinutes, "minute");
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) {
    return relative.format(diffHours, "hour");
  }
  const diffDays = Math.round(diffHours / 24);
  return relative.format(diffDays, "day");
}
