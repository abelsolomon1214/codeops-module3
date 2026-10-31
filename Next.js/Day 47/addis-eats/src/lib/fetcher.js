export async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const error = new Error(errorBody.error || `HTTP error! status: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}
