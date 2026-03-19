import { useNavigate } from "react-router-dom";
import type { NewsItem as NewsItemType } from "../types/news-item";

export const NewsItem = ({ item }: { item: NewsItemType }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/news/${item.slug}`, {
      state: { item },
    });
  };

  return (
    <li onClick={onClick} className="news-card">
      <h3>{item.title}</h3>
      {item.excerpt && (
        <p>
          <em>{item.excerpt}</em>
        </p>
      )}
      <p>{item.content}</p>
    </li>
  );
};
