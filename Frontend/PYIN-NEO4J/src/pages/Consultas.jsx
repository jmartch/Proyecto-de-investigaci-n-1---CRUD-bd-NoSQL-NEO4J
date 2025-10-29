import { useEffect, useState } from "react";

export default function Consultas() {
  const [postsUsuario, setPostsUsuario] = useState([]);
  const [comentariosPost, setComentariosPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/consultas/posts-usuario")
      .then((res) => res.json())
      .then((data) => setPostsUsuario(data.records || []));

    fetch("http://localhost:3000/api/consultas/comentarios-post")
      .then((res) => res.json())
      .then((data) => setComentariosPost(data.records || []));
  }, []);

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Consultas</h1>

      <h2>Posts por Usuario</h2>
      <ul>
        {postsUsuario.map((r, i) => (
          <li key={i}>
            {r._fields[0]} — {r._fields[1]}
          </li>
        ))}
      </ul>

      <h2>Comentarios por Post</h2>
      <ul>
        {comentariosPost.map((r, i) => (
          <li key={i}>
            <strong>{r._fields[0]}</strong> — {r._fields[1]} — {r._fields[2]}
          </li>
        ))}
      </ul>
    </div>
  );
}
