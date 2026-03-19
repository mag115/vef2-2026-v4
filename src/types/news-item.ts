export type NewsItem = {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
  excerpt?: string;
  slug?: string;
  published: boolean;
  updatedAt: string;
  authorId: number;
};
