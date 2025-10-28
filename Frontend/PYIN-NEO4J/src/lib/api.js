// src/lib/api.js
// Usa proxy de Vite: '/api'  -> vite.config.js debe tener server.proxy
const API_URL = '/api';

export async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include', // cookies de sesión si tu backend las usa
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let msg = `Error: ${res.status} ${res.statusText}`;
    try {
      const t = await res.text();
      if (t) msg += `\n${t}`;
    } catch {}
    throw new Error(msg);
  }

  // Si no hay cuerpo JSON, devuelve {}
  try {
    return await res.json();
  } catch {
    return {};
  }
}
