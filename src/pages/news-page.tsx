import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { getAuthorById } from "../api/author";
import { getNewsById } from "../api/news";
import type { Author } from "../types/author";
import type { NewsItem } from "../types/news-item";
import type { ApiErrorResponse } from "../types/api";

export function NewsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [item, setItem] = useState<NewsItem | null>(
    (location.state?.item as NewsItem) || null,
  );
  const [loadingNews, setLoadingNews] = useState(!location.state?.item);
  const [newsError, setNewsError] = useState("");

  const [author, setAuthor] = useState<Author | null>(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [authorError, setAuthorError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      if (!id || item) return;
      try {
        setLoadingNews(true);
        setNewsError("");
        const data = await getNewsById(Number(id));
        setItem(data);
      } catch (err: unknown) {
        if (isAxiosError<ApiErrorResponse>(err)) {
          if (err.response?.status === 404) {
            setNewsError("Frétt fannst ekki");
          } else {
            setNewsError(
              err.response?.data?.error ??
                err.response?.data?.message ??
                "Gat ekki sótt frétt.",
            );
          }
        } else {
          setNewsError("Gat ekki sótt frétt.");
        }
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, [id, item]);

  useEffect(() => {
    const fetchAuthor = async (authorId: number) => {
      setLoadingAuthor(true);
      setAuthorError("");
      try {
        const data = await getAuthorById(authorId);
        setAuthor(data);
      } catch (err: unknown) {
        if (isAxiosError<ApiErrorResponse>(err)) {
          setAuthorError(
            err.response?.data?.error ??
              err.response?.data?.message ??
              "Gat ekki sótt höfund.",
          );
        } else {
          setAuthorError("Gat ekki sótt höfund.");
        }
      } finally {
        setLoadingAuthor(false);
      }
    };

    if (item?.authorId) {
      fetchAuthor(item.authorId);
    }
  }, [item?.authorId]);

  if (loadingNews) {
    return (
      <section className="page-container">
        <p>Sæki frétt...</p>
      </section>
    );
  }

  if (newsError || !item) {
    return (
      <section className="page-container">
        <h2>Úps!</h2>
        <p className="error">{newsError || "Frétt fannst ekki."}</p>
        <button
          className="button"
          onClick={() => navigate(-1)}
          style={{ marginTop: "1rem" }}
        >
          Til baka
        </button>
      </section>
    );
  }

  return (
    <section className="page-container">
      <div className="article-detail">
        <h2>{item.title}</h2>

        {item.createdAt && (
          <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
            Birt: {new Date(item.createdAt).toLocaleDateString("is-IS")}
            {item.updatedAt &&
              item.updatedAt !== item.createdAt &&
              ` (Uppfært: ${new Date(item.updatedAt).toLocaleDateString("is-IS")})`}
          </p>
        )}

        {loadingAuthor && <p>Sæki höfund...</p>}
        {authorError && <p className="error">{authorError}</p>}

        {author && (
          <div className="author-card">
            <h3 style={{ margin: "0 0 5px" }}>Höfundur: {author.name}</h3>
            {author.email && (
              <p style={{ margin: 0 }}>
                Netfang: <a href={`mailto:${author.email}`}>{author.email}</a>
              </p>
            )}
          </div>
        )}

        {item.excerpt && (
          <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
            {item.excerpt}
          </p>
        )}

        <div>
          <p>{item.content ?? "Sæki..."}</p>
        </div>

        <button className="button" onClick={() => navigate(-1)}>
          Til baka
        </button>
      </div>
    </section>
  );
}
