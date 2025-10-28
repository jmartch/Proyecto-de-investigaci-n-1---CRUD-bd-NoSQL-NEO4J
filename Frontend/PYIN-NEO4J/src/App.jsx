import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

// Vistas
import Comments from "./pages/Comments.jsx";            // Vista usuario final (feed)
import Users from "./pages/Users.jsx";                  // CRUD USUARIO (admin)
import Posts from "./pages/Posts.jsx";                  // CRUD POST (admin)
import CommentsAdmin from "./pages/CommentsAdmin.jsx";  // CRUD COMENTARIO (admin)
import Queries from "./pages/Queries.jsx";              // Consultas (admin)

// Tabs del modo admin
const ADMIN_PAGES = {
  users: "users",
  posts: "posts",
  comments: "comments",
  queries: "queries",
};

export default function App() {
  const { currentUser, authLoading } = useContext(AuthContext) || {};
  const [adminMode, setAdminMode] = useState(false);
  const [adminPage, setAdminPage] = useState(ADMIN_PAGES.users);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <span className="brand__dot" />
            <span>CONEXA NEO4J</span>
          </div>

          <nav className="nav">
            <button
              className={`nav__btn ${!adminMode ? "nav__btn--active" : ""}`}
              onClick={() => setAdminMode(false)}
              type="button"
            >
              Inicio
            </button>
            <button
              className={`nav__btn ${adminMode ? "nav__btn--active" : ""}`}
              onClick={() => setAdminMode(true)}
              type="button"
            >
              Admin
            </button>
          </nav>

          <div className="header__user small">
            {authLoading
              ? "Cargando…"
              : currentUser
              ? `Sesión: ${currentUser.nombre}`
              : "Invitado"}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container page">
        {!adminMode ? (
          // Vista de usuario final (tipo Facebook sencillo)
          <Comments />
        ) : (
          // Vista Admin con tabs CRUD + Consultas
          <div className="card">
            <div className="crud-tabs" style={{ marginBottom: 12 }}>
              <button
                className={`crud-tab ${
                  adminPage === ADMIN_PAGES.users ? "crud-tab--active" : ""
                }`}
                onClick={() => setAdminPage(ADMIN_PAGES.users)}
                type="button"
              >
                Usuarios
              </button>
              <button
                className={`crud-tab ${
                  adminPage === ADMIN_PAGES.posts ? "crud-tab--active" : ""
                }`}
                onClick={() => setAdminPage(ADMIN_PAGES.posts)}
                type="button"
              >
                Posts
              </button>
              <button
                className={`crud-tab ${
                  adminPage === ADMIN_PAGES.comments ? "crud-tab--active" : ""
                }`}
                onClick={() => setAdminPage(ADMIN_PAGES.comments)}
                type="button"
              >
                Comentarios
              </button>
              <button
                className={`crud-tab ${
                  adminPage === ADMIN_PAGES.queries ? "crud-tab--active" : ""
                }`}
                onClick={() => setAdminPage(ADMIN_PAGES.queries)}
                type="button"
              >
                Consultas
              </button>
            </div>

            {adminPage === ADMIN_PAGES.users && <Users />}
            {adminPage === ADMIN_PAGES.posts && <Posts />}
            {adminPage === ADMIN_PAGES.comments && <CommentsAdmin />}
            {adminPage === ADMIN_PAGES.queries && <Queries />}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container small">
          © {new Date().getFullYear()} Neo4j – Frontend
        </div>
      </footer>
    </>
  );
}
