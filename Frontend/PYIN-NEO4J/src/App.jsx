import { useState } from 'react';
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import Posts from './pages/Posts.jsx';
import Comments from './pages/Comments.jsx';
import NotFound from './pages/NotFound.jsx';

const PAGES = { home:'home', users:'users', posts:'posts', comments:'comments' };

export default function App() {
  const [page, setPage] = useState(PAGES.home);
  const is = (p) => page === p;

  const renderPage = () => {
    switch (page) {
      case PAGES.home:
        return (
          <div className="card card--hero">
            <h1> CONEXA - Proyecto NEO4J</h1>
            <p className="small">Sistema de Gestión de Usuarios, Publicaciones y Comentarios basado en Neo4j</p>

            <h3>Bienvenido/a. Aquí iniciaremos el CRUD para Usuarios, Posts y Comentarios.</h3>

            <div style={{height:20}} />
            <Home />
            <div style={{height:16}} />

            <div style={{ display:'flex', gap:10}}>
              <button className="btn btn--primary" onClick={() => setPage(PAGES.users)}>
                Gestionar Usuarios
              </button>
              <button className="btn btn--ghost" onClick={() => setPage(PAGES.posts)}>
                Gestionar Posts
              </button>
              {/* FIX: antes iba a posts, ahora a comments */}
              <button className="btn btn--ghost" onClick={() => setPage(PAGES.comments)}>
                Gestionar Comentarios
              </button>
            </div>
          </div>
        );
      case PAGES.users: return <div className="card"><Users /></div>;
      case PAGES.posts: return <div className="card"><Posts /></div>;
      case PAGES.comments: return <div className="card"><Comments /></div>;
      default: return <div className="card"><NotFound /></div>;
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <span className="brand__dot" />
            <span>CONEXA NEO4J</span>
          </div>

          {/* NAV visible pero inutilizable */}
          <nav className="nav">
            <button
              className={`nav__btn ${is(PAGES.home) ? 'nav__btn--active':''}`}
              onClick={() => setPage(PAGES.home)}
            >
              Inicio
            </button>

            {/* Deshabilitados: sin foco, sin eventos */}
            <button
              className="nav__btn"
              disabled
              aria-disabled="true"
              tabIndex={-1}
            >
              Usuarios
            </button>

            <button
              className="nav__btn"
              disabled
              aria-disabled="true"
              tabIndex={-1}
            >
              Posts
            </button>

            <button
              className="nav__btn"
              disabled
              aria-disabled="true"
              tabIndex={-1}
            >
              Comentarios
            </button>
          </nav>
        </div>
      </header>

      {/* PAGE */}
      <main className="container page">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container small">
          © {new Date().getFullYear()} Neo4j CRUD – Frontend
        </div>
      </footer>
    </>
  );
}
