import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { api } from "../lib/api.js";

export default function Comments() {
  const { currentUser } = useContext(AuthContext);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [posting, setPosting] = useState({});

  useEffect(() => { cargarFeed(); }, []);

  function normalizePost(p) {
    const id = p.idp ?? p.id ?? p.id_post ?? p.post_id ?? p._id ?? null;
    return {
      id,
      titulo: p.titulo ?? p.title ?? `Post${id ? ` #${id}` : ""}`,
      contenido: p.contenido ?? p.body ?? "",
      autor_nombre: p.autor_nombre ?? p.autor ?? p.author ?? "Usuario",
      fecha: p.fecha ?? p.created_at ?? p.createdAt ?? null,
      totalComentarios: p.totalComentarios ?? p.total_comentarios ?? p.commentsCount
    };
  }

  async function cargarFeed() {
    try {
      setLoading(true); setErr(null);
      const raw = await api("/posts?limit=20");
      const data = Array.isArray(raw) ? raw : (raw?.posts || raw?.data || raw?.results || []);
      const normalized = (Array.isArray(data) ? data : (raw && (raw.id||raw.idp) ? [raw] : []))
        .map(normalizePost).filter(p=>p.id!==null);
      setFeed(normalized);
    } catch (e) { setErr(e.message); setFeed([]); }
    finally { setLoading(false); }
  }

  function onDraftChange(id, v){ setDrafts(d=>({ ...d, [id]: v })); }

  async function publicarComentario(id) {
    const texto = (drafts[id] || "").trim();
    if (!texto) return;
    try {
      setPosting(p=>({ ...p, [id]: true })); setErr(null);
      await api(`/posts/${id}/comments`, { method:'POST', body: JSON.stringify({ contenido: texto }) });
      setDrafts(d=>({ ...d, [id]: "" }));
      // opcional: await cargarFeed();
    } catch (e) { setErr(e.message); }
    finally { setPosting(p=>({ ...p, [id]: false })); }
  }

  if (!currentUser) {
    return (
      <div className="container" style={{ paddingTop: 8 }}>
        <h2>Publicaciones</h2>
        <div className="card" style={{ marginTop: 12 }}>Debes iniciar sesión para comentar.</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      <h2 style={{ marginBottom: 8 }}>Publicaciones</h2>
      <p className="small" style={{ opacity:.8, marginBottom:16 }}>
        Comentas como <b>{currentUser?.nombre || "usuario"}</b>. Escribe tu comentario debajo de la publicación.
      </p>

      {err && <div className="card" style={{ background:"#fff5f5", borderColor:"#f8d7da", color:"#a94442", marginBottom:12, whiteSpace:'pre-wrap' }}>{err}</div>}

      {loading ? <div className="empty">Cargando publicaciones…</div> :
       feed.length === 0 ? <div className="empty">No hay publicaciones.</div> :
       (
         <ul style={{ listStyle:'none', padding:0, display:'grid', gap:12 }}>
           {feed.map(post=>(
             <li key={post.id} className="card" style={{ borderColor:'#eee' }}>
               <h3 style={{ margin:0 }}>{post.titulo}</h3>
               <div className="small" style={{ opacity:.7, marginBottom:8 }}>
                 por {post.autor_nombre}{post.fecha ? ` • ${new Date(post.fecha).toLocaleString()}` : ""}
               </div>
               <p style={{ whiteSpace:'pre-wrap' }}>{post.contenido || "(sin contenido)"}</p>

               <div style={{ marginTop:12, display:'flex', gap:8 }}>
                 <input
                   className="input" style={{ flex:1 }} type="text" placeholder="Escribe un comentario…"
                   value={drafts[post.id] || ""} onChange={e=>onDraftChange(post.id, e.target.value)}
                   onKeyDown={(e)=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); publicarComentario(post.id); } }}
                   disabled={!!posting[post.id]}
                 />
                 <button
                   className={`btn btn--primary ${!(drafts[post.id]||"").trim() ? 'btn--disabled':''}`}
                   onClick={()=>publicarComentario(post.id)}
                   disabled={!(drafts[post.id]||"").trim() || !!posting[post.id]}
                 >
                   {posting[post.id] ? "Publicando…" : "Comentar"}
                 </button>
               </div>

               {typeof post.totalComentarios === 'number' && (
                 <div className="small" style={{ opacity:.7, marginTop:8 }}>
                   {post.totalComentarios} comentario{post.totalComentarios === 1 ? "" : "s"}
                 </div>
               )}
             </li>
           ))}
         </ul>
       )}
    </div>
  );
}
