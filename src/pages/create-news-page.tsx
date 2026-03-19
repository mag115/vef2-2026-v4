import { useState } from "react";
import { isAxiosError } from "axios";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/form";
import { Input } from "../components/input";
import { Button } from "../components/button";
import type { ApiErrorResponse } from "../types/api";

export function CreateNewsPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    authorId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        authorId: Number(form.authorId),
      };

      const res = await api.post("/news", payload);

      navigate(`/news/${res.data.id}`, { replace: true, state: res.data });
    } catch (err: unknown) {
      console.error(err);

      if (isAxiosError<ApiErrorResponse>(err)) {
        const apiError =
          err.response?.data?.error ??
          err.response?.data?.message ??
          err.message;
        const status = err.response?.status ?? 500;

        if (status >= 400 && status < 500) {
          setError(`Villa frá notanda: ${apiError}`);
        } else if (status >= 500) {
          setError(`Kerfisvilla: ${apiError}`);
        } else {
          setError("Ekki tókst að búa til frétt.");
        }
      } else {
        const message = err instanceof Error ? err.message : "Óþekkt villa";
        setError(`Kerfisvilla: ${message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-container">
      <h1>Ný frétt</h1>

      <Form onSubmit={handleSubmit}>
        <Input
          label="Titill"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Input
          label="Stutt lýsing"
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <label>Efni</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
            required
          />
        </div>

        <Input
          label="Author ID"
          name="authorId"
          type="number"
          value={form.authorId}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Bý til..." : "Búa til frétt"}
        </Button>

        {error && <p>{error}</p>}
      </Form>
    </section>
  );
}
