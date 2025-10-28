// src/pages/Home.jsx
export default function Home({ goUsers, goPosts, goComments, goQueries }) {
  return (
    <div className="card card--hero">
      <h1>CONEXA – Proyecto NEO4J</h1>
      <p className="small">Sistema de gestión de Usuarios, Publicaciones y Comentarios (NoSQL – Neo4j).</p>

      <div className="grid2" style={{ marginTop: 16 }}>
        <button className="btn btn--primary" onClick={goUsers}>Gestionar Usuarios</button>
        <button className="btn btn--ghost" onClick={goPosts}>Gestionar Posts</button>
        <button className="btn btn--ghost" onClick={goComments}>Comentar (feed)</button>
        <button className="btn btn--ghost" onClick={goQueries}>Consultas</button>
      </div>
    </div>
  );
}
