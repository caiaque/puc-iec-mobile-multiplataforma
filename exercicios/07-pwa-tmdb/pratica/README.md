# A7 — PWA TMDB: filmes instalável e offline

> Atividade 7 — Arquitetura Mobile Multiplataforma (15 pts)

---

## Antes de começar

```bash
# Entre na pasta correta
cd exercicios/07-pwa-tmdb/pratica

# Confirme que está no lugar certo
ls src/services
# → deve mostrar: tmdb.ts  db.ts
```

> **Windows:** use `cd exercicios\07-pwa-tmdb\pratica` e `dir src\services`

```bash
npm install
cp .env.example .env.local        # Windows cmd: copy .env.example .env.local
# Edite .env.local → coloque seu token em VITE_TMDB_TOKEN
# Gere em: https://www.themoviedb.org/settings/api  (Read Access Token)
```

---

## Roteiro das tarefas

### Em aula com o professor (não avaliativo)

| Arquivo | O que fazemos juntos |
|---|---|
| [`src/__tests__/unit/01-MovieCard.test.tsx`](src/__tests__/unit/01-MovieCard.test.tsx) | 📘 MODELO — lemos os testes prontos, entendemos a estrutura |
| [`src/services/tmdb.ts`](src/services/tmdb.ts) | Vemos o stub com `throw` e entendemos o que o TODO 1 pede |

### Solo em casa (avaliativo)

| Ordem | Arquivo | O que implementar | Dificuldade |
|---|---|---|---|
| 1 | [`src/services/tmdb.ts`](src/services/tmdb.ts) | **TODO 1** — `fetchPopularMovies` (chama `tmdbClient.get`) | FÁCIL |
| 2 | [`src/__tests__/unit/03-useFavorites.test.ts`](src/__tests__/unit/03-useFavorites.test.ts) | **TODO 2** — casos `it.todo` 3, 4 e 5 | MÉDIO |

---

## Como rodar os testes

```bash
# Roda uma vez (vê o que está vermelho)
npm test

# Modo watch (re-roda ao salvar)
npm run test:watch
```

**Antes do TODO 1:** testes 1 e 2 do `02-tmdb-service.test.ts` ficam vermelhos.  
**Depois do TODO 1:** testes 1 e 2 ficam verdes.  
**Depois do TODO 2:** casos 3, 4, 5 do `03-useFavorites.test.ts` ficam verdes.

---

## Arquivos do exercício

```
pratica/
  src/
    services/
      tmdb.ts          ← ✏️  TODO 1 (fetchPopularMovies)
      db.ts            ← IndexedDB (já pronto)
    repositories/
      moviesRepository.ts  ← estratégias NetworkFirst/CacheFirst (já pronto)
    hooks/
      useTmdb.ts       ← usa o repository (já pronto)
      useFavorites.ts  ← favoritos no localStorage (já pronto)
    screens/
      HomeScreen.tsx   ← view (já pronta)
    __tests__/
      unit/
        01-MovieCard.test.tsx    ← 📘 MODELO — leia primeiro
        02-tmdb-service.test.ts  ← ✅ fica verde após TODO 1
        03-useFavorites.test.ts  ← ✅ TODO 2: implemente os it.todo()
```

---

## Testando o app offline (demo em aula)

Depois do TODO 1 implementado:

1. `npm run dev` → abra http://localhost:5173
2. Deixe os filmes carregarem
3. Clique **📵 Offline** → app recarrega
4. Filmes continuam aparecendo (IndexedDB serve o cache)
5. Clique **🗑 Limpar cache** → estado vazio
6. Clique **🌐 Online** → busca fresca

---

## Entrega

```bash
git checkout -b feat/a7-pwa

git add src/services/tmdb.ts
git add src/__tests__/unit/03-useFavorites.test.ts
git commit -m "feat(a7-pwa): fetchPopularMovies + testes useFavorites"
git push origin feat/a7-pwa
```

Abra PR com título: `feat(a7-pwa): <seu-github-login>`  
O bot J.A.R.V.I.S. comenta a nota mínima automática a cada commit.

---

Enunciado completo com critérios de avaliação:
[`../enunciado.md`](../enunciado.md)
