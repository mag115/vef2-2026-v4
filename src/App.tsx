import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage, NewsPage, CreateNewsPage } from "./pages";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/new" element={<CreateNewsPage />} />
        <Route path="news/:id" element={<NewsPage />} />
      </Route>
    </Routes>
  );
}
