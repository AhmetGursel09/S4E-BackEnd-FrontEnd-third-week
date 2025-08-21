export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function bfetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }
  return res.json();
}
