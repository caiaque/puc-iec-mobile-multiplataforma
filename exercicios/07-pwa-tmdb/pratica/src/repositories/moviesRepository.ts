// src/repositories/moviesRepository.ts
//
// Aplica as mesmas cache strategies da aula de Service Workers,
// mas na camada de dados com IndexedDB.
//
// Estratégias (igual ao que o SW faz com HTTP):
//   NetworkFirst          — tenta rede; cache como fallback offline
//   CacheFirst            — serve cache; atualiza em background
//   StaleWhileRevalidate  — serve cache imediatamente + atualiza em paralelo

import { fetchPopularMovies } from '../services/tmdb';
import { saveMovies, loadMovies } from '../services/db';
import type { Movie } from '../types/movie';

export type CacheStrategy = 'NetworkFirst' | 'CacheFirst' | 'StaleWhileRevalidate';

// ── Estratégias de cache ────────────────────────────────────────────────────
// Mesmas estratégias do slide "Cache strategies" (Aula 4),
// mas aqui no IndexedDB em vez do CacheStorage do Service Worker.
//
// Os TODOs estão em services/db.ts (saveMovies / loadMovies).
// Quando implementados, o offline passa a funcionar automaticamente.
// ───────────────────────────────────────────────────────────────────────────

// Tenta rede; se falhar, serve cache. Ideal pra dados dinâmicos.
async function networkFirst(page: number): Promise<Movie[]> {
  try {
    const { results } = await fetchPopularMovies(page);
    await saveMovies(page, results); // TODO 3a — sem implementação, é no-op
    return results;
  } catch (err) {
    const cached = await loadMovies(page); // TODO 3b — sem implementação, retorna undefined
    if (cached) return cached;
    const offlineErr = err instanceof Error ? err : new Error(String(err));
    (offlineErr as Error & { offline: boolean }).offline = true;
    throw offlineErr;
  }
}

// Serve cache imediatamente; busca rede só se não tiver cache.
async function cacheFirst(page: number): Promise<Movie[]> {
  const cached = await loadMovies(page);
  if (cached) {
    // Atualiza em background sem bloquear
    fetchPopularMovies(page)
      .then(({ results }) => saveMovies(page, results))
      .catch(() => {});
    return cached;
  }
  const { results } = await fetchPopularMovies(page);
  await saveMovies(page, results);
  return results;
}

// Serve cache imediatamente (rápido) + busca rede em paralelo.
// Quando rede responde, notifica via onRevalidate pra UI atualizar.
async function staleWhileRevalidate(
  page: number,
  onRevalidate?: (movies: Movie[]) => void,
): Promise<Movie[]> {
  const cached = await loadMovies(page);

  const networkPromise = fetchPopularMovies(page).then(({ results }) => {
    saveMovies(page, results).catch(() => {});
    onRevalidate?.(results);
    return results;
  });

  return cached ?? networkPromise;
}

export const moviesRepository = {
  async getPopularMovies(
    page: number,
    strategy: CacheStrategy = 'NetworkFirst',
    onRevalidate?: (movies: Movie[]) => void,
  ): Promise<Movie[]> {
    switch (strategy) {
      case 'CacheFirst':          return cacheFirst(page);
      case 'StaleWhileRevalidate': return staleWhileRevalidate(page, onRevalidate);
      default:                    return networkFirst(page);
    }
  },
};
