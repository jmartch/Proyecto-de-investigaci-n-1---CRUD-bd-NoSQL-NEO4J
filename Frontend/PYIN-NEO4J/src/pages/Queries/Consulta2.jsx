import { useState } from "react";

export default function Consulta2() {
  const [userName, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!userName) return alert("Ingrese un nombre de usuario");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/consulta2?user=${encodeURIComponent(userName)}`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert("Error al obtener los comentarios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consulta-card">
      <h2 className="consulta-title">Consulta 2: Comentarios de los Posts</h2>

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
        {comments.length > 0 ? (
          <table className="consulta-table">
            <thead>
              <tr>
                <th>Fecha creación</th>
                <th>Comentario</th>
                <th>Fecha autorización</th>
                <th>Autorizado por</th>
                <th>Reacción</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c, i) => (
                <tr key={i}>
                  <td>{c.fechorCom || "-"}</td>
                  <td>{c.contenidoCom || "-"}</td>
                  <td>{c.fechorAut || "-"}</td>
                  <td>{c.autorizadoPor || "-"}</td>
                  <td>
                    {c.likeNotLike === "megusta"
                      ? "👍"
                      : c.likeNotLike === "nomegusta"
                      ? "👎"
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p className="consulta-empty">No hay comentarios.</p>
        )}
      </div>
    </div>
  );
}
