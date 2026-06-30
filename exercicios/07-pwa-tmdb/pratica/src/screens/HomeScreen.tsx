// src/screens/HomeScreen.tsx

import { useState, useRef } from 'react';
import { usePopularMovies, isTokenMissing } from '../hooks/useTmdb';
import { useFavorites } from '../hooks/useFavorites';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { AppHeader } from '../components/AppHeader';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/MovieCardSkeleton';
import { NetworkToggle } from '../components/NetworkToggle';
import { ErrorScreen } from './ErrorScreen';
import { OfflineScreen } from './OfflineScreen';
import { TokenMissingScreen } from './TokenMissingScreen';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const { movies, loading, error, hasMore, loadMore } = usePopularMovies();
  const { isFavorite, toggle, count } = useFavorites();
  const [search, setSearch] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(sentinelRef, loadMore);

  if (isTokenMissing) return <TokenMissingScreen />;
  if (error) return (error as Error & { offline?: boolean }).offline
    ? <OfflineScreen />
    : <ErrorScreen error={error} />;

  const visible = search.trim()
    ? movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    : movies;

  return (
    <main style={styles.main}>
      <AppHeader favoritesCount={count} />
      <NetworkToggle />

      <input
        type="search"
        placeholder="Buscar filme…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
        aria-label="Buscar filme"
      />

      <section>
        {visible.length === 0 && search && (
          <p style={{ color: '#90a4ae', textAlign: 'center', padding: 24 }}>
            Nenhum resultado para "{search}"
          </p>
        )}
        {visible.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            isFavorite={isFavorite(m.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </section>

      {loading && (
        <section aria-label="Carregando mais filmes">
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
        </section>
      )}

      {/* Sentinel — IntersectionObserver dispara loadMore quando chegar aqui */}
      {hasMore && !loading && <div ref={sentinelRef} style={{ height: 1 }} />}
    </main>
  );
}
