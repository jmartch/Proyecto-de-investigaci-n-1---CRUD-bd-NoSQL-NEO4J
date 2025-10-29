import { useEffect, useState } from "react";

export default function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [formData, setFormData] = useState({
    consec: "",
    contenidoCom: "",
    fechoraCom: "",
    fechoraAut: "",
    likeNotLike: "",
    idu: "",
    idp: "",
  });

  const API_URL = "http://localhost:3000/api/comentarios";

  const fetchComentarios = async () => {
    const res = await fetch("http://localhost:3000/api/consultas/comentarios-post");
    const data = await res.json();
    const records = data.records || [];
    setComentarios(records.map((r) => r._fields.map((f) => f)));
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      consec: "",
      contenidoCom: "",
      fechoraCom: "",
      fechoraAut: "",
      likeNotLike: "",
      idu: "",
      idp: "",
    });
    fetchComentarios();
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Comentarios</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", width: "400px" }}>
        <input
          placeholder="Consecutivo"
          value={formData.consec}
          onChange={(e) => setFormData({ ...formData, consec: e.target.value })}
          required
        />
        <input
          placeholder="Contenido"
          value={formData.contenidoCom}
          onChange={(e) => setFormData({ ...formData, contenidoCom: e.target.value })}
          required
        />
        <input
          placeholder="Fecha Comentario"
          value={formData.fechoraCom}
          onChange={(e) => setFormData({ ...formData, fechoraCom: e.target.value })}
        />
        <input
          placeholder="Fecha Autorización"
          value={formData.fechoraAut}
          onChange={(e) => setFormData({ ...formData, fechoraAut: e.target.value })}
        />
        <input
          placeholder="Like / Dislike"
          value={formData.likeNotLike}
          onChange={(e) => setFormData({ ...formData, likeNotLike: e.target.value })}
        />
        <input
          placeholder="ID Usuario"
          value={formData.idu}
          onChange={(e) => setFormData({ ...formData, idu: e.target.value })}
        />
        <input
          placeholder="ID Post"
          value={formData.idp}
          onChange={(e) => setFormData({ ...formData, idp: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <h2 style={{ marginTop: "1rem" }}>Listado de Comentarios</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Usuario Post</th>
            <th>Post</th>
            <th>Comentario</th>
            <th>Autor</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map((c, i) => (
            <tr key={i}>
              {c.map((campo, j) => (
                <td key={j}>{campo}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
