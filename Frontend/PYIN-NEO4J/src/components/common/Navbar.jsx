import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="brand-badge" />
          <span>Proyecto NEO4J — Frontend</span>
        </div>

        <nav className="nav">
          <NavLink to="/" className={linkClass}>Inicio</NavLink>
          <NavLink to="/users" className={linkClass}>Usuarios</NavLink>
          <NavLink to="/posts" className={linkClass}>Posts</NavLink>
          <NavLink to="/comments" className={linkClass}>Comentarios</NavLink>
        </nav>
      </div>
    </header>
  );
}
