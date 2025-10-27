const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Error: ${res.status} - ${await res.text()}`);

  try {
    return await res.json();
  } catch {
    return {};
  }
}
