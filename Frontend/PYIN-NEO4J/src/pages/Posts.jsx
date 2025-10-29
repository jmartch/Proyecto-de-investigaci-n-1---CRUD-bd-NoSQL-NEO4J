import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ idp: "", contenido: "", idu: "" });
  const API_URL = "http://localhost:3000/api/posts";

  const fetchPosts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    const records = data.records || [];
    setPosts(
      records.map((r) => ({
        idp: r._fields[0],
        contenido: r._fields[1],
        idu: r._fields[2],
        nombre: r._fields[3],
      }))
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ idp: "", contenido: "", idu: "" });
    fetchPosts();
  };

  const handleDelete = async (idp) => {
    if (!window.confirm("¿Eliminar este post?")) return;
    await fetch(`${API_URL}/${idp}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Gestión de Posts</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
        <input
          placeholder="ID Post"
          value={formData.idp}
          onChange={(e) => setFormData({ ...formData, idp: e.target.value })}
          required
        />
        <input
          placeholder="Contenido"
          value={formData.contenido}
          onChange={(e) =>
            setFormData({ ...formData, contenido: e.target.value })
          }
          required
        />
        <input
          placeholder="ID Usuario"
          value={formData.idu}
          onChange={(e) => setFormData({ ...formData, idu: e.target.value })}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <table style={{ marginTop: "1rem", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID Post</th>
            <th>Contenido</th>
            <th>ID Usuario</th>
            <th>Nombre Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.idp}>
              <td>{p.idp}</td>
              <td>{p.contenido}</td>
              <td>{p.idu}</td>
              <td>{p.nombre}</td>
              <td>
                <button onClick={() => handleDelete(p.idp)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
