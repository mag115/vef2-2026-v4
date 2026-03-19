import type { NewsItem as NewsItemType } from "../types/news-item";
import { NewsItem } from "./news-item";

export function NewsList({ news }: { news: NewsItemType[] }) {
  return (
    <ul className="news-list">
      {news.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
