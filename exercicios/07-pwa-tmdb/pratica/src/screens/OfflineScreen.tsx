// src/screens/OfflineScreen.tsx

export function OfflineScreen() {
  return (
    <main style={styles.center}>
      <p style={styles.icon}>📵</p>
      <h2 style={styles.title}>Você está offline</h2>
      <p style={styles.msg}>Nenhum dado em cache ainda. Volte online para carregar os filmes.</p>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 40, textAlign: 'center' },
  icon: { fontSize: 48, margin: '0 0 12px' },
  title: { color: '#90a4ae', margin: '0 0 8px' },
  msg: { color: '#546e7a', fontSize: 14, maxWidth: 300 },
};
