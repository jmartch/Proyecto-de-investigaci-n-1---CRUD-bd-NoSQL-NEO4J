import { Link } from "react-router-dom";
import "../styles/Navbar.css";


export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">PYIN Neo4j</h1>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/comentarios">Comentarios</Link></li>
        <li><Link to="/consultas">Consultas</Link></li>
      </ul>
    </nav>
  );
}
