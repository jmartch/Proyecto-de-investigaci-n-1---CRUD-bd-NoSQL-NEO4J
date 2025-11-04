import { useEffect, useMemo, useState } from "react";

export default function Consulta2() {
  const API_BASE = "http://localhost:3000/api";
  const USUARIOS_URL = `${API_BASE}/usuarios`;
  const CONSULTA2_URL = `${API_BASE}/consultas/consulta2`;

  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [iduSel, setIduSel] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar usuarios para el select
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(USUARIOS_URL);
        const data = await res.json();
        setUsuarios(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        alert("Error cargando usuarios");
      }
    })();
  }, []);

  const usuariosFiltrados = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return usuarios;
    return usuarios.filter(u =>
      String(u.idu || "").toLowerCase().includes(q) ||
      String(u.nomu || "").toLowerCase().includes(q)
    );
  }, [usuarios, filtro]);

  const handleSearch = async () => {
    if (!iduSel) return alert("Selecciona un código de usuario (idu)");
    if (["ANONIMO","MANAGER"].includes(String(iduSel).toUpperCase())) {
      return alert("No se permiten usuarios ANONIMO o MANAGER");
    }

    setLoading(true);
    try {
      const url = `${CONSULTA2_URL}?idu=${encodeURIComponent(iduSel)}`;
      const res = await fetch(url);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert("Error al obtener los comentarios");
    } finally {
      setLoading(false);
    }
  };

  const fmt = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString("es-CO");
    } catch { return iso; }
  };

  return (
    <div className="consulta-card" style={{ maxWidth: 960, margin: "0 auto" }}>
      <h2 className="consulta-title">Consulta 2: Comentarios de los posts del usuario</h2>

      <div className="consulta-form" style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr auto" }}>
        <input
          type="text"
          placeholder="Filtrar por idu o nombre…"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="consulta-input"
        />
        <select
          value={iduSel}
          onChange={(e) => setIduSel(e.target.value)}
          className="consulta-select"
        >
          <option value="">Selecciona un código de usuario</option>
          {usuariosFiltrados.map(u => (
            <option key={u.idu} value={u.idu}>
              {u.idu} — {u.nomu || "(sin nombre)"}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} disabled={loading || !iduSel} className="consulta-btn">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      <div className="consulta-results" style={{ marginTop: 16 }}>
        {comments.length > 0 ? (
          <table className="consulta-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8 }}>Post (idp / título)</th>
                <th style={{ textAlign: "left", padding: 8 }}>Fecha creación</th>
                <th style={{ textAlign: "left", padding: 8 }}>Comentario</th>
                <th style={{ textAlign: "left", padding: 8 }}>Fecha autorización</th>
                <th style={{ textAlign: "left", padding: 8 }}>Autor comentario</th>
                <th style={{ textAlign: "left", padding: 8 }}>Reacción</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c, i) => (
                <tr key={i} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 8 }}>
                    <div><strong>{c.idp}</strong></div>
                    <div style={{ color: "#666" }}>{c.titulo || "(Sin título)"}</div>
                  </td>
                  <td style={{ padding: 8 }}>{fmt(c.fechoraCom)}</td>
                  <td style={{ padding: 8 }}>{c.contenidoCom || "-"}</td>
                  <td style={{ padding: 8 }}>{fmt(c.fechoraAut)}</td>
                  <td style={{ padding: 8 }}>
                    {c.autorComentarioNombre || c.autorComentarioId || "-"}
                  </td>
                  <td style={{ padding: 8 }}>
                    {c.likeNotLike === "megusta" ? "👍" :
                     c.likeNotLike === "nomegusta" ? "👎" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !!iduSel && !loading && <p className="consulta-empty">No hay comentarios.</p>
        )}
      </div>
    </div>
  );
}
