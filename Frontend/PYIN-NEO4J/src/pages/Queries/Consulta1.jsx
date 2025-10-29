import { useState } from "react";

export default function Consulta1() {
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!userName) return alert("Ingrese un nombre de usuario válido");
    if (["ANONIMO", "MANAGER"].includes(userName.toUpperCase())) {
      return alert("No se permiten usuarios ANONIMO o MANAGER");
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/consulta1?user=${encodeURIComponent(userName)}`
      );
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consulta-card">
      <h2 className="consulta-title">Consulta 1: Posts de un Usuario</h2>

      <div className="consulta-form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="consulta-input"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="consulta-btn"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      <div className="consulta-results">
        {posts.length > 0 ? (
          <ul className="consulta-list">
            {posts.map((p, i) => (
              <li key={i} className="consulta-list-item">
                <h4 className="consulta-post-title">{p.titulo || "(Sin título)"}</h4>
                <p className="consulta-post-content">
                  {p.contenido || "(Sin contenido)"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="consulta-empty">No hay publicaciones.</p>
        )}
      </div>
    </div>
  );
}
