import { useState, useEffect } from "react";
import './Comments.css';

export default function Comments() {
  const [tab, setTab] = useState("insertar");
  const [comentarios, setComentarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [consec, setConsec] = useState("");
  const [contenidoCom, setContenidoCom] = useState("");
  const [likeNotLike, setLikeNotLike] = useState("megusta");
  const [idu, setIdu] = useState("");
  const [idp, setIdp] = useState("");

  const API_URL = "http://localhost:3000/api/comentarios";
  const USUARIOS_URL = "http://localhost:3000/api/usuarios";
  const POSTS_URL = "http://localhost:3000/api/posts";

  const getCurrentDateTime = () => {
    return new Date().toISOString();
  };

  const loadUsuarios = async () => {
    try {
      const response = await fetch(USUARIOS_URL);
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch(POSTS_URL);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error cargando posts:", error);
    }
  };

  const loadComentarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/consulta`);
      if (response.ok) {
        const data = await response.json();
        setComentarios(data);
      }
    } catch (error) {
      console.error("Error cargando comentarios:", error);
      alert("❌ Error al cargar comentarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
    loadPosts();
    loadComentarios();
  }, []);

  useEffect(() => {
    if (idu) {
      const postsDelUsuario = posts.filter(post => post.idu === idu);
      setFilteredPosts(postsDelUsuario);
      if (idp && !postsDelUsuario.find(p => p.idp === idp)) {
        setIdp("");
      }
    } else {
      setFilteredPosts([]);
      setIdp("");
    }
  }, [idu, posts]);

  const clearForm = () => {
    setConsec("");
    setContenidoCom("");
    setLikeNotLike("megusta");
    setIdu("");
    setIdp("");
  };

  // Cargar datos del comentario seleccionado
  const loadComentarioData = (consecValue) => {
    const comentario = comentarios.find(c => c.consec === consecValue);
    if (comentario) {
      setContenidoCom(comentario.contenidoCom);
      setLikeNotLike(comentario.likeNotLike || "megusta");
    }
  };

  const handleInsert = async () => {
    if (!consec || !contenidoCom || !idu || !idp) {
      alert("⚠️ Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consec,
          contenidoCom,
          fechoraCom: getCurrentDateTime(),
          fechoraAut: getCurrentDateTime(),
          likeNotLike,
          idu,
          idp
        })
      });

      if (response.ok) {
        alert("✅ Comentario insertado correctamente");
        clearForm();
        loadComentarios();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || "No se pudo insertar"}`);
      }
    } catch (error) {
      console.error("Error insertando:", error);
      alert("❌ Error de conexión al insertar");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!consec || !contenidoCom) {
      alert("⚠️ Debes seleccionar un comentario y el nuevo contenido");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${consec}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenidoCom })
      });

      if (response.ok) {
        alert("✏️ Comentario actualizado correctamente");
        clearForm();
        loadComentarios();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || "No se pudo actualizar"}`);
      }
    } catch (error) {
      console.error("Error actualizando:", error);
      alert("❌ Error de conexión al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!consec) {
      alert("⚠️ Debes seleccionar un comentario a eliminar");
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar el comentario ${consec}?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${consec}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("🗑️ Comentario eliminado correctamente");
        clearForm();
        loadComentarios();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || "No se pudo eliminar"}`);
      }
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("❌ Error de conexión al eliminar");
    } finally {
      setLoading(false);
    }
  };

  const getNombreUsuario = (userId) => {
    const usuario = usuarios.find(u => u.idu === userId);
    return usuario ? usuario.nomu || usuario.idu : userId;
  };

  const getTituloPost = (postId) => {
    const post = posts.find(p => p.idp === postId);
    return post ? post.titulo || post.idp : postId;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                tab === "insertar"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => { setTab("insertar"); clearForm(); }}
            >
              Insertar
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                tab === "actualizar"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => { setTab("actualizar"); clearForm(); }}
            >
              Actualizar
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                tab === "borrar"
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => { setTab("borrar"); clearForm(); }}
            >
              Borrar
            </button>
          </div>
        </div>

        {/* INSERTAR */}
        {tab === "insertar" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Insertar COMENTARIO</h3>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consecutivo *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Código único del comentario"
                    value={consec}
                    onChange={(e) => setConsec(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Like/Not Like *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={likeNotLike}
                    onChange={(e) => setLikeNotLike(e.target.value)}
                  >
                    <option value="megusta">👍 Me gusta</option>
                    <option value="nomegusta">👎 No me gusta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuario *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={idu}
                    onChange={(e) => setIdu(e.target.value)}
                  >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.idu} value={usuario.idu}>
                        {usuario.nomu || usuario.idu} ({usuario.idu})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={idp}
                    onChange={(e) => setIdp(e.target.value)}
                    disabled={!idu}
                  >
                    <option value="">
                      {idu ? "Selecciona un post" : "Primero selecciona un usuario"}
                    </option>
                    {filteredPosts.map((post) => (
                      <option key={post.idp} value={post.idp}>
                        {post.titulo || post.idp} ({post.idp})
                      </option>
                    ))}
                  </select>
                  {idu && filteredPosts.length === 0 && (
                    <p className="text-sm text-amber-600 mt-1">
                      ⚠️ Este usuario no tiene posts disponibles
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido del comentario *
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Escribe el contenido del comentario..."
                  value={contenidoCom}
                  onChange={(e) => setContenidoCom(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
                disabled={loading}
                onClick={handleInsert}
              >
                {loading ? "Insertando..." : "Insertar comentario"}
              </button>
            </div>
          </div>
        )}

        {/* ACTUALIZAR */}
        {tab === "actualizar" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Actualizar COMENTARIO</h3>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona el comentario *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={consec}
                  onChange={(e) => {
                    setConsec(e.target.value);
                    loadComentarioData(e.target.value);
                  }}
                >
                  <option value="">Selecciona un comentario</option>
                  {comentarios.map((com) => (
                    <option key={com.consec} value={com.consec}>
                      {com.consec} - {com.contenidoCom.substring(0, 50)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nuevo contenido *
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Nuevo contenido del comentario..."
                  value={contenidoCom}
                  onChange={(e) => setContenidoCom(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
                  disabled={loading || !consec}
                  onClick={handleUpdate}
                >
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                  onClick={clearForm}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BORRAR */}
        {tab === "borrar" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Borrar COMENTARIO</h3>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona el comentario *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={consec}
                  onChange={(e) => {
                    setConsec(e.target.value);
                    loadComentarioData(e.target.value);
                  }}
                >
                  <option value="">Selecciona un comentario</option>
                  {comentarios.map((com) => (
                    <option key={com.consec} value={com.consec}>
                      {com.consec} - {com.contenidoCom.substring(0, 50)}...
                    </option>
                  ))}
                </select>
              </div>

              {consec && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Contenido:</strong> {contenidoCom}
                  </p>
                </div>
              )}

              <button
                type="button"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400"
                disabled={loading || !consec}
                onClick={handleDelete}
              >
                {loading ? "Eliminando..." : "Eliminar comentario"}
              </button>
            </div>
          </div>
        )}

        {/* Tabla de comentarios */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Listado de COMENTARIOS</h3>
            <button
              onClick={loadComentarios}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
              disabled={loading}
            >
              🔄 Recargar
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Cargando...</div>
          ) : comentarios.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay comentarios para mostrar.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Consec</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Usuario</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Post</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contenido</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Like</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {comentarios.map((com, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{com.consec}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {getNombreUsuario(com.idu)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {getTituloPost(com.idp)}
                      </td>
                      <td className="px-4 py-3 text-sm">{com.contenidoCom}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          com.likeNotLike === "megusta" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {com.likeNotLike === "megusta" ? "👍 Me gusta" : "👎 No me gusta"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(com.fechoraCom).toLocaleString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          )}
          
        </div>
      </div>
    </div>
  );
  
}