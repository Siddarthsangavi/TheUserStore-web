export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const apiFetch = async (path: string, options?: RequestInit) => {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  return res.json();
};
