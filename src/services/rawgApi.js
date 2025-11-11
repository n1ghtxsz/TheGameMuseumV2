// src/services/rawgApi.js
const API_KEY = import.meta.env.VITE_RAWG_KEY || "634bf1a85c9a41efa8ff6869b439c342";
const BASE = "https://api.rawg.io/api";

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const txt = await res.text();
      console.warn("RAWG fetch não ok:", res.status, url, txt);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Erro no fetch RAWG:", err, url);
    return null;
  }
}

export async function getGames(page = 1, page_size = 40) {
  const url = `${BASE}/games?key=${API_KEY}&page=${page}&page_size=${page_size}`;
  const data = await safeFetch(url);
  return data?.results || [];
}

// cache em memória simples para detalhes
const detailsCache = new Map();

export async function getGameDetails(id) {
  if (!id) return null;
  if (detailsCache.has(id)) return detailsCache.get(id);

  const url = `${BASE}/games/${id}?key=${API_KEY}`;
  const data = await safeFetch(url);
  if (data) detailsCache.set(id, data);
  return data;
}
