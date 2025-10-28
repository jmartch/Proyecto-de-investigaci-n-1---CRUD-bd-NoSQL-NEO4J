// src/pages/CommentsAdmin.jsx
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function CommentsAdmin() {
  const [tab, setTab] = useState('insertar');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // insertar
  const [consec, setConsec] = useState('');
  const [fechorCom, setFechorCom] = useState('');
  const [contenido, setContenido] = useState('');
  const [fechorAut, setFechorAut] = useState('');
  const [quienAutorizo, setQuienAutorizo] = useState('');
  const [likeNotLike, setLikeNotLike] = useState('megusta');

  // actualizar
  const [consecUp, setConsecUp] = useState('');
  const [contenidoUp, setContenidoUp] = useState('');
  const [fechorAutUp, setFechorAutUp] = useState('');
  const [quienAutorizoUp, setQuienAutorizoUp] = useState('');
  const [likeNotLikeUp, setLikeNotLikeUp] = useState('');

  // borrar
  const [consecDel, setConsecDel] = useState('');

  useEffect(()=>{ load(); }, []);

  async function load() {
    try {
      setLoading(true); setErr(null);
      const data = await api('/comentarios?limit=100');
      setItems(Array.isArray(data) ? data : []);
    } catch (e) { setErr(e.message); setItems([]); }
    finally { setLoading(false); }
  }

  async function insertar(e){
    e.preventDefault();
    if (!consec.trim() || !fechorCom.trim() || !contenido.trim()) return;
    try {
      setLoading(true);
      await api('/comentarios', {
        method:'POST',
        body: JSON.stringify({ consec, fechorCom, contenido, fechorAut, quienAutorizo, likeNotLike })
      });
      setConsec(''); setFechorCom(''); setContenido(''); setFechorAut(''); setQuienAutorizo(''); setLikeNotLike('megusta');
      await load();
      alert('✅ Comentario creado');
    } catch (e){ alert(e.message); } finally { setLoading(false); }
  }

  async function actualizar(e){
    e.preventDefault();
    if (!consecUp.trim()) return;
    try {
      setLoading(true);
      await api(`/comentarios/${consecUp}`, {
        method:'PUT',
        body: JSON.stringify({
          ...(contenidoUp.trim()?{contenido:contenidoUp}:{ }),
          ...(fechorAutUp.trim()?{fechorAut:fechorAutUp}:{ }),
          ...(quienAutorizoUp.trim()?{quienAutorizo:quienAutorizoUp}:{ }),
          ...(likeNotLikeUp?{likeNotLike:likeNotLikeUp}:{ })
        })
      });
      setConsecUp(''); setContenidoUp(''); setFechorAutUp(''); setQuienAutorizoUp(''); setLikeNotLikeUp('');
      await load();
      alert('✅ Comentario actualizado');
    } catch (e){ alert(e.message); } finally { setLoading(false); }
  }

  async function borrar(e){
    e.preventDefault();
    if (!consecDel.trim()) return;
    if (!confirm(`¿Eliminar comentario ${consecDel}?`)) return;
    try {
      setLoading(true);
      await api(`/comentarios/${consecDel}`, { method:'DELETE' });
      setConsecDel('');
      await load();
      alert('✅ Comentario eliminado');
    } catch (e){ alert(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="container" style={{ paddingTop:8 }}>
      <div className="crud-tabs">
        <button className={`crud-tab ${tab==='insertar'?'crud-tab--active':''}`} onClick={()=>setTab('insertar')}>Insertar</button>
        <button className={`crud-tab ${tab==='actualizar'?'crud-tab--active':''}`} onClick={()=>setTab('actualizar')}>Actualizar</button>
        <button className={`crud-tab ${tab==='borrar'?'crud-tab--active':''}`} onClick={()=>setTab('borrar')}>Borrar</button>
      </div>

      {tab==='insertar' && (
        <section className="crud-section">
          <h3 className="crud-title">Insertar COMENTARIO</h3>
          <form className="form" onSubmit={insertar}>
            <div className="field-row">
              <div className="field"><label className="label">consec *</label><input className="input" value={consec} onChange={e=>setConsec(e.target.value)} /></div>
              <div className="field"><label className="label">fechorCom *</label><input className="input" placeholder="YYYY-MM-DD HH:mm" value={fechorCom} onChange={e=>setFechorCom(e.target.value)} /></div>
            </div>
            <div className="field-row">
              <div className="field"><label className="label">contenido *</label><input className="input" value={contenido} onChange={e=>setContenido(e.target.value)} /></div>
              <div className="field"><label className="label">fechorAut</label><input className="input" placeholder="YYYY-MM-DD HH:mm" value={fechorAut} onChange={e=>setFechorAut(e.target.value)} /></div>
            </div>
            <div className="field-row">
              <div className="field"><label className="label">quienAutorizo</label><input className="input" value={quienAutorizo} onChange={e=>setQuienAutorizo(e.target.value)} /></div>
              <div className="field">
                <label className="label">likeNotLike</label>
                <select className="input" value={likeNotLike} onChange={e=>setLikeNotLike(e.target.value)}>
                  <option value="megusta">megusta</option>
                  <option value="nomegusta">nomegusta</option>
                </select>
              </div>
            </div>
            <div className="actions"><button className="btn btn--primary">Insertar</button></div>
          </form>
        </section>
      )}

      {tab==='actualizar' && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar COMENTARIO</h3>
          <form className="form" onSubmit={actualizar}>
            <div className="field-row">
              <div className="field"><label className="label">consec *</label><input className="input" value={consecUp} onChange={e=>setConsecUp(e.target.value)} /></div>
              <div className="field"><label className="label">contenido</label><input className="input" value={contenidoUp} onChange={e=>setContenidoUp(e.target.value)} /></div>
            </div>
            <div className="field-row">
              <div className="field"><label className="label">fechorAut</label><input className="input" value={fechorAutUp} onChange={e=>setFechorAutUp(e.target.value)} /></div>
              <div className="field"><label className="label">quienAutorizo</label><input className="input" value={quienAutorizoUp} onChange={e=>setQuienAutorizoUp(e.target.value)} /></div>
            </div>
            <div className="field-row">
              <div className="field">
                <label className="label">likeNotLike</label>
                <select className="input" value={likeNotLikeUp} onChange={e=>setLikeNotLikeUp(e.target.value)}>
                  <option value="">(sin cambio)</option>
                  <option value="megusta">megusta</option>
                  <option value="nomegusta">nomegusta</option>
                </select>
              </div>
            </div>
            <div className="actions">
              <button className={`btn btn--primary ${!consecUp?'btn--disabled':''}`} disabled={!consecUp}>Guardar</button>
            </div>
          </form>
        </section>
      )}

      {tab==='borrar' && (
        <section className="crud-section">
          <h3 className="crud-title">Borrar COMENTARIO</h3>
          <form className="form" onSubmit={borrar}>
            <div className="field-row">
              <div className="field"><label className="label">consec *</label><input className="input" value={consecDel} onChange={e=>setConsecDel(e.target.value)} /></div>
            </div>
            <div className="actions">
              <button className={`btn btn--danger ${!consecDel?'btn--disabled':''}`} disabled={!consecDel}>Eliminar</button>
            </div>
          </form>
        </section>
      )}

      {/* Listado */}
      <section className="card" style={{ marginTop:12 }}>
        <h3 className="crud-title" style={{ marginBottom:8 }}>Listado de COMENTARIOS</h3>
        {err && <div style={{color:'red', padding:8, marginBottom:8}}>⚠️ {err}</div>}
        {loading && <div className="empty">Cargando…</div>}
        {!loading && items.length===0 && <div className="empty">Sin comentarios.</div>}
        {!loading && items.length>0 && (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #ddd', textAlign:'left' }}>
                <th style={{ padding:'12px 8px' }}>consec</th>
                <th style={{ padding:'12px 8px' }}>contenido</th>
                <th style={{ padding:'12px 8px' }}>fechorCom</th>
                <th style={{ padding:'12px 8px' }}>fechorAut</th>
                <th style={{ padding:'12px 8px' }}>quienAutorizo</th>
                <th style={{ padding:'12px 8px' }}>likeNotLike</th>
              </tr>
            </thead>
            <tbody>
              {items.map(c=>(
                <tr key={c.consec} style={{ borderBottom:'1px solid #eee' }}>
                  <td style={{ padding:'12px 8px' }}>{c.consec}</td>
                  <td style={{ padding:'12px 8px' }}>{c.contenido}</td>
                  <td style={{ padding:'12px 8px' }}>{c.fechorCom ? new Date(c.fechorCom).toLocaleString() : '-'}</td>
                  <td style={{ padding:'12px 8px' }}>{c.fechorAut ? new Date(c.fechorAut).toLocaleString() : '-'}</td>
                  <td style={{ padding:'12px 8px' }}>{c.quienAutorizo || '-'}</td>
                  <td style={{ padding:'12px 8px' }}>{c.likeNotLike ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
