import type { NewsItem } from "../types/news-item";
import type { PaginatedResponse } from "../types/api";
import { api } from "./client";

export async function getNews(
  limit: number,
  offset: number,
): Promise<PaginatedResponse<NewsItem>> {
  const res = await api.get<PaginatedResponse<NewsItem>>("/news", {
    params: { limit, offset },
  });

  return res.data;
}

export async function getNewsById(id: number): Promise<NewsItem> {
  const res = await api.get<NewsItem>(`/news/${id}`);
  return res.data;
}
