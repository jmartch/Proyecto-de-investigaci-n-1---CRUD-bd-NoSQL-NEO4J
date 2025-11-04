import { useEffect, useMemo, useState } from "react";

export default function Consulta1() {
  const API_BASE = "http://localhost:3000/api";
  const USUARIOS_URL = `${API_BASE}/usuarios`;
  const POSTS_BY_USER_URL = `${API_BASE}/consultas/consulta1`; // ojo con cómo montas el router

  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [iduSel, setIduSel] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(USUARIOS_URL);
        const data = await res.json();
        // Esperado ahora: [{ idu: 'juanangel', nombre: 'Juan Ángel' }, ...]
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
      String(u.nombre || "").toLowerCase().includes(q)
    );
  }, [usuarios, filtro]);

  const usuarioSel = useMemo(
    () => usuarios.find(u => String(u.idu) === String(iduSel)),
    [usuarios, iduSel]
  );

  const handleSearch = async () => {
    if (!iduSel) return alert("Selecciona un código de usuario (idu)");
    if (["ANONIMO","MANAGER"].includes(String(iduSel).toUpperCase())) {
      return alert("No se permiten usuarios ANONIMO o MANAGER");
    }

    setLoading(true);
    try {
      const url = `${POSTS_BY_USER_URL}?idu=${encodeURIComponent(iduSel)}`;
      const res = await fetch(url);
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
    <div className="consulta-card" style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 className="consulta-title">Consulta 1: Posts por código de usuario</h2>

      <div className="consulta-form" style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr auto" }}>
        <input
          type="text"
          placeholder="Filtrar por código o nombre…"
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
              {u.idu} — {u.nombre || "(sin nombre)"}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} disabled={loading || !iduSel} className="consulta-btn">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {iduSel && (
        <p style={{ marginTop: 8, color: "#555" }}>
          <strong>Seleccionado:</strong> {iduSel}
          {usuarioSel?.nombre ? ` — ${usuarioSel.nombre}` : ""}
        </p>
      )}

      <div className="consulta-results" style={{ marginTop: 16 }}>
        {loading ? (
          <p>Cargando…</p>
        ) : posts.length > 0 ? (
          <ul className="consulta-list" style={{ display: "grid", gap: 12 }}>
            {posts.map((p, i) => (
              <li key={i} className="consulta-list-item" style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
                <h4 className="consulta-post-title" style={{ margin: 0 }}>{p.titulo || "(Sin título)"}</h4>
                <p className="consulta-post-content" style={{ marginTop: 6 }}>
                  {p.contenido || "(Sin contenido)"}
                </p>
                <small style={{ color: "#777" }}>idp: {p.idp}</small>
              </li>
            ))}
          </ul>
        ) : (
          !!iduSel && <p className="consulta-empty">No hay publicaciones para este usuario.</p>
        )}
      </div>
    </div>
  );
}
