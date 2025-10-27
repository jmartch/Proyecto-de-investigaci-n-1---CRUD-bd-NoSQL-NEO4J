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
      case PAGES.home: return (
        <div className="card card--hero">
          <h1>Proyecto NEO4J — Frontend</h1>
          <p className="small">React + Vite (sin Tailwind) · Conéctalo a tu backend Node/Neo4j</p>
          <div style={{height:16}} />
          <Home />
          <div style={{height:16}} />
          <div style={{display:'flex', gap:10}}>
            <button className="btn btn--primary" onClick={() => setPage(PAGES.users)}>Comenzar con Usuarios</button>
            <button className="btn btn--ghost" onClick={() => setPage(PAGES.posts)}>Ver Posts</button>
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
            <span>Neo4j CRUD</span>
          </div>

          <nav className="nav">
            <button
              className={`nav__btn ${is(PAGES.home) ? 'nav__btn--active':''}`}
              onClick={() => setPage(PAGES.home)}
            >Inicio</button>

            <button
              className={`nav__btn ${is(PAGES.users) ? 'nav__btn--active':''}`}
              onClick={() => setPage(PAGES.users)}
            >Usuarios</button>

            <button
              className={`nav__btn ${is(PAGES.posts) ? 'nav__btn--active':''}`}
              onClick={() => setPage(PAGES.posts)}
            >Posts</button>

            <button
              className={`nav__btn ${is(PAGES.comments) ? 'nav__btn--active':''}`}
              onClick={() => setPage(PAGES.comments)}
            >Comentarios</button>
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
