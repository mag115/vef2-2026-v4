import type { Author } from "../types/author";
import { api } from "./client";

export async function getAuthorById(id: number): Promise<Author> {
  const res = await api.get<Author>(`/authors/${id}`);
  return res.data;
}
