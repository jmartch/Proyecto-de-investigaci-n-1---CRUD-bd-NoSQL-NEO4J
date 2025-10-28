// src/pages/Queries.jsx
import { useState } from 'react';
import { api } from '../lib/api';

export default function Queries() {
  const [tab, setTab] = useState('c1');

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      <div className="crud-tabs">
        <button className={`crud-tab ${tab==='c1'?'crud-tab--active':''}`} onClick={()=>setTab('c1')}>Consulta 1</button>
        <button className={`crud-tab ${tab==='c2'?'crud-tab--active':''}`} onClick={()=>setTab('c2')}>Consulta 2</button>
      </div>

      {tab==='c1' ? <Consulta1/> : <Consulta2/>}
    </div>
  );
}

// [0.5] CONSULTA 1: Posts de un usuario (excluye ANONIMO/MANAGER)
function Consulta1(){
  const [nombre, setNombre] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function buscar(e){
    e.preventDefault();
    try {
      setLoading(true); setErr(null); setRows([]);
      const q = nombre.trim() ? `/consultas/posts-por-usuario?nombre=${encodeURIComponent(nombre.trim())}` : '/consultas/posts-por-usuario';
      const data = await api(q);
      setRows(Array.isArray(data) ? data : []);
    } catch (e){ setErr(e.message); } finally { setLoading(false); }
  }

  return (
    <section className="card">
      <h3 className="crud-title">Consulta 1: Posts por usuario (≠ ANONIMO / MANAGER)</h3>
      <form className="form" onSubmit={buscar} style={{ marginBottom:12 }}>
        <div className="field-row">
          <div className="field">
            <label className="label">Nombre de usuario (opcional)</label>
            <input className="input" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Camila"/>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn--primary">Buscar</button>
        </div>
      </form>

      {err && <div style={{color:'red', padding:8, marginBottom:8}}>⚠️ {err}</div>}
      {loading && <div className="empty">Buscando…</div>}
      {!loading && rows.length===0 && <div className="empty">Sin resultados.</div>}
      {!loading && rows.length>0 && (
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #ddd', textAlign:'left' }}>
              <th style={{ padding:'12px 8px' }}>Usuario</th>
              <th style={{ padding:'12px 8px' }}>IDP</th>
              <th style={{ padding:'12px 8px' }}>Título</th>
              <th style={{ padding:'12px 8px' }}>Contenido</th>
              <th style={{ padding:'12px 8px' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={{ borderBottom:'1px solid #eee' }}>
                <td style={{ padding:'12px 8px' }}>{r.usuario}</td>
                <td style={{ padding:'12px 8px' }}>{r.idp}</td>
                <td style={{ padding:'12px 8px' }}>{r.titulo}</td>
                <td style={{ padding:'12px 8px' }}>{r.contenido}</td>
                <td style={{ padding:'12px 8px' }}>{r.fecha ? new Date(r.fecha).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

// [0.5] CONSULTA 2: Comentarios de un post (con fechas y autorización)
function Consulta2(){
  const [idp, setIdp] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function buscar(e){
    e.preventDefault();
    if (!idp.trim()) return;
    try {
      setLoading(true); setErr(null); setRows([]);
      const data = await api(`/consultas/comentarios-post?idp=${encodeURIComponent(idp.trim())}`);
      setRows(Array.isArray(data) ? data : []);
    } catch (e){ setErr(e.message); } finally { setLoading(false); }
  }

  return (
    <section className="card">
      <h3 className="crud-title">Consulta 2: Comentarios de un POST</h3>
      <form className="form" onSubmit={buscar} style={{ marginBottom:12 }}>
        <div className="field-row">
          <div className="field">
            <label className="label">IDP del post *</label>
            <input className="input" value={idp} onChange={e=>setIdp(e.target.value)} placeholder="ID del post"/>
          </div>
        </div>
        <div className="actions">
          <button className={`btn btn--primary ${!idp.trim()?'btn--disabled':''}`} disabled={!idp.trim()}>Buscar</button>
        </div>
      </form>

      {err && <div style={{color:'red', padding:8, marginBottom:8}}>⚠️ {err}</div>}
      {loading && <div className="empty">Buscando…</div>}
      {!loading && rows.length===0 && <div className="empty">Sin resultados.</div>}
      {!loading && rows.length>0 && (
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #ddd', textAlign:'left' }}>
              <th style={{ padding:'12px 8px' }}>Autor del post</th>
              <th style={{ padding:'12px 8px' }}>Título</th>
              <th style={{ padding:'12px 8px' }}>Consec</th>
              <th style={{ padding:'12px 8px' }}>F. creación</th>
              <th style={{ padding:'12px 8px' }}>Comentario</th>
              <th style={{ padding:'12px 8px' }}>F. autorización</th>
              <th style={{ padding:'12px 8px' }}>Quién autorizó</th>
              <th style={{ padding:'12px 8px' }}>Like/NoLike</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={{ borderBottom:'1px solid #eee' }}>
                <td style={{ padding:'12px 8px' }}>{r.autorPost || '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.tituloPost || '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.consec || '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.fechorCom ? new Date(r.fechorCom).toLocaleString() : '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.contenido || '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.fechorAut ? new Date(r.fechorAut).toLocaleString() : '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.quienAutorizo || '-'}</td>
                <td style={{ padding:'12px 8px' }}>{r.likeNotLike ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
