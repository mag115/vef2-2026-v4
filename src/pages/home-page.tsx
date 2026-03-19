import { useEffect, useState, useCallback } from "react";
import { getNews } from "../api/news";
import { NewsList } from "../components/news-list";
import type { NewsItem } from "../types/news-item";

const LIMIT = 6;

export function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(
    async (offsetToFetch: number) => {
      if (loading) return;

      setLoading(true);
      setError("");

      try {
        const response = await getNews(LIMIT, offsetToFetch);
        const newItems = response.data;

        setNews((prev) => {
          const merged = [...prev, ...newItems];

          //prevent duplicates
          return Array.from(
            new Map(merged.map((item) => [item.id, item])).values(),
          );
        });

        const loadedCount = response.paging.offset + response.data.length;

        setHasMore(loadedCount < response.paging.total);

        setOffset(loadedCount);
      } catch (err) {
        console.error(err);
        setError("Ekki tókst að sækja fréttir.");
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    fetchNews(0);
    // just fetch on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLoadMore() {
    void fetchNews(offset);
  }

  return (
    <section className="page-container">
      <h2>Forsíða</h2>

      {error && <p>{error}</p>}

      <NewsList news={news} />

      {loading && <p>Sæki fréttir...</p>}

      {!loading && hasMore && (
        <button onClick={handleLoadMore}>Load more</button>
      )}

      {!hasMore && news.length > 0 && <p>Engar fleiri fréttir.</p>}
    </section>
  );
}
