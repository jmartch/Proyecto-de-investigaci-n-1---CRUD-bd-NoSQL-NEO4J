import { useState, useEffect } from "react";

// Cambia esta línea en tu componente Posts
const API_URL = "http://localhost:3000/api"; 

export default function Posts() {
  const [tab, setTab] = useState("insertar");
  const [posts, setPosts] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estados para Insertar
  const [newPost, setNewPost] = useState({
    idp: "",
    contenido: "",
    idu: ""
  });

  // Estados para Actualizar
  const [updatePost, setUpdatePost] = useState({
    idp: "",
    contenido: ""
  });

  // Estados para Borrar
  const [deleteIdp, setDeleteIdp] = useState("");

  // Cargar posts y usuarios al montar
  useEffect(() => {
    fetchPosts();
    fetchUsuarios();
  }, []);

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Obtener todos los posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) throw new Error("Error al cargar posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Error cargando posts:", err);
      setError("Error al cargar posts");
    }
  };

  // Obtener todos los usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios/`);
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  // Insertar post
  const handleInsert = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPost.idp || !newPost.contenido || !newPost.idu) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear post");
      }

      setSuccess("Post creado exitosamente");
      setNewPost({ idp: "", contenido: "", idu: "" });
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar post
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!updatePost.idp || !updatePost.contenido) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/posts/${updatePost.idp}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido: updatePost.contenido })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al actualizar post");
      }

      setSuccess("Post actualizado exitosamente");
      setUpdatePost({ idp: "", contenido: "" });
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar post
  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!deleteIdp) {
      setError("Ingrese el IDP del post a eliminar");
      return;
    }

    if (!window.confirm(`¿Está seguro de eliminar el post ${deleteIdp}?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/posts/${deleteIdp}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar post");
      }

      setSuccess("Post eliminado exitosamente");
      setDeleteIdp("");
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      {/* Mensajes */}
      {error && (
        <div style={{
          padding: "12px",
          marginBottom: "12px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          borderRadius: "4px",
          color: "#c33"
        }}>
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: "12px",
          marginBottom: "12px",
          backgroundColor: "#efe",
          border: "1px solid #cfc",
          borderRadius: "4px",
          color: "#363"
        }}>
          ✅ {success}
        </div>
      )}

      {/* Tabs */}
      <div className="crud-tabs" style={{ marginBottom: 12 }}>
        <button
          className={`crud-tab ${tab === "insertar" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("insertar")}
        >
          Insertar
        </button>
        <button
          className={`crud-tab ${tab === "actualizar" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("actualizar")}
        >
          Actualizar
        </button>
        <button
          className={`crud-tab ${tab === "borrar" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("borrar")}
        >
          Borrar
        </button>
      </div>

      {/* INSERTAR */}
      {tab === "insertar" && (
        <section className="crud-section">
          <h3 className="crud-title">Insertar POST</h3>
          <div className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDP *</label>
                <input
                  className="input"
                  placeholder="Ingrese IDP"
                  value={newPost.idp}
                  onChange={(e) => setNewPost({ ...newPost, idp: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label className="label">Contenido *</label>
                <input
                  className="input"
                  placeholder="Ingrese contenido del post"
                  value={newPost.contenido}
                  onChange={(e) => setNewPost({ ...newPost, contenido: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label className="label">Usuario (IDU) *</label>
                <select
                  className="input"
                  value={newPost.idu}
                  onChange={(e) => setNewPost({ ...newPost, idu: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((u) => (
                    <option key={u.idu} value={u.idu}>
                      {u.idu} - {u.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="actions">
              <button
                className={`btn btn--primary ${loading ? "btn--disabled" : ""}`}
                onClick={handleInsert}
                disabled={loading}
              >
                {loading ? "Insertando..." : "Insertar post"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ACTUALIZAR */}
      {tab === "actualizar" && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar POST</h3>
          <div className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDP *</label>
                <select
                  className="input"
                  value={updatePost.idp}
                  onChange={(e) => {
                    const selectedPost = posts.find(p => p.idp === e.target.value);
                    setUpdatePost({
                      idp: e.target.value,
                      contenido: selectedPost?.contenido || ""
                    });
                  }}
                  disabled={loading}
                >
                  <option value="">Seleccione un post</option>
                  {posts.map((p) => (
                    <option key={p.idp} value={p.idp}>
                      {p.idp} - {p.contenido.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label">Nuevo contenido *</label>
                <input
                  className="input"
                  placeholder="Contenido actualizado"
                  value={updatePost.contenido}
                  onChange={(e) => setUpdatePost({ ...updatePost, contenido: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="actions">
              <button
                className={`btn btn--primary ${loading ? "btn--disabled" : ""}`}
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => setUpdatePost({ idp: "", contenido: "" })}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}

      {/* BORRAR */}
      {tab === "borrar" && (
        <section className="crud-section">
          <h3 className="crud-title">Borrar POST</h3>
          <div className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDP *</label>
                <select
                  className="input"
                  value={deleteIdp}
                  onChange={(e) => setDeleteIdp(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Seleccione un post</option>
                  {posts.map((p) => (
                    <option key={p.idp} value={p.idp}>
                      {p.idp} - {p.contenido.substring(0, 50)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="actions">
              <button
                className={`btn btn--danger ${loading ? "btn--disabled" : ""}`}
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar post"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tabla */}
      <section className="card" style={{ marginTop: 12 }}>
        <h3 className="crud-title" style={{ marginBottom: 8 }}>
          Listado de POSTS
        </h3>
        {posts.length === 0 ? (
          <div className="empty">No hay posts para mostrar.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>IDP</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Contenido</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Usuario</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>IDU</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.idp} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}><strong>{post.idp}</strong></td>
                    <td style={{ padding: "12px" }}>{post.contenido}</td>
                    <td style={{ padding: "12px" }}>{post.nombreUsuario}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        padding: "4px 8px",
                        backgroundColor: "#e3f2fd",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}>
                        {post.idu}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}