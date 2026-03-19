import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="page-header">
      <Link to="/" className="logo">
        <h1>Fréttavefur</h1>
      </Link>
      <nav>
        <Link to="/">Forsíða</Link>
        <Link to="/news/new" className="button">
          Ný frétt
        </Link>
      </nav>
    </header>
  );
}
