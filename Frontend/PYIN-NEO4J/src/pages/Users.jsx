// src/pages/Users.jsx
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Users() {
  const [tab, setTab] = useState('insertar');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // forms
  const [idu, setIdu] = useState('');
  const [nombre, setNombre] = useState('');
  const [iduUpdate, setIduUpdate] = useState('');
  const [nombreUpdate, setNombreUpdate] = useState('');
  const [iduDelete, setIduDelete] = useState('');

  useEffect(()=>{ load(); }, []);

  async function load() {
    try {
      setLoading(true); setError(null);
      const list = await api('/usuarios');
      setUsuarios(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  async function insertar(e) {
    e.preventDefault();
    if (!idu.trim() || !nombre.trim()) return;
    try {
      setLoading(true);
      await api('/usuarios', { method:'POST', body: JSON.stringify({ idu, nombre }) });
      setIdu(''); setNombre('');
      await load();
      alert('✅ Usuario creado');
    } catch(e){ alert(e.message); } finally { setLoading(false); }
  }

  async function actualizar(e) {
    e.preventDefault();
    if (!iduUpdate.trim() || !nombreUpdate.trim()) return;
    try {
      setLoading(true);
      await api(`/usuarios/${iduUpdate}`, { method:'PUT', body: JSON.stringify({ nombre: nombreUpdate }) });
      setIduUpdate(''); setNombreUpdate('');
      await load();
      alert('✅ Usuario actualizado');
    } catch(e){ alert(e.message); } finally { setLoading(false); }
  }

  async function borrar(e) {
    e.preventDefault();
    if (!iduDelete.trim()) return;
    if (!confirm(`¿Eliminar usuario ${iduDelete}?`)) return;
    try {
      setLoading(true);
      await api(`/usuarios/${iduDelete}`, { method:'DELETE' });
      setIduDelete('');
      await load();
      alert('✅ Usuario eliminado');
    } catch(e){ alert(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      <div className="crud-tabs">
        <button className={`crud-tab ${tab==='insertar'?'crud-tab--active':''}`} onClick={()=>setTab('insertar')}>Insertar</button>
        <button className={`crud-tab ${tab==='actualizar'?'crud-tab--active':''}`} onClick={()=>setTab('actualizar')}>Actualizar</button>
        <button className={`crud-tab ${tab==='borrar'?'crud-tab--active':''}`} onClick={()=>setTab('borrar')}>Borrar</button>
      </div>

      {tab==='insertar' && (
        <section className="crud-section">
          <h3 className="crud-title">Insertar USUARIO</h3>
          <form className="form" onSubmit={insertar}>
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input className="input" value={idu} onChange={e=>setIdu(e.target.value)} disabled={loading} />
              </div>
              <div className="field">
                <label className="label">Nombre *</label>
                <input className="input" value={nombre} onChange={e=>setNombre(e.target.value)} disabled={loading} />
              </div>
            </div>
            <div className="actions">
              <button className={`btn btn--primary ${(!idu||!nombre||loading)?'btn--disabled':''}`} disabled={!idu||!nombre||loading}>Insertar</button>
            </div>
          </form>
        </section>
      )}

      {tab==='actualizar' && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar USUARIO</h3>
          <form className="form" onSubmit={actualizar}>
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input className="input" value={iduUpdate} onChange={e=>setIduUpdate(e.target.value)} disabled={loading} />
              </div>
              <div className="field">
                <label className="label">Nuevo nombre *</label>
                <input className="input" value={nombreUpdate} onChange={e=>setNombreUpdate(e.target.value)} disabled={loading} />
              </div>
            </div>
            <div className="actions">
              <button className={`btn btn--primary ${(!iduUpdate||!nombreUpdate||loading)?'btn--disabled':''}`} disabled={!iduUpdate||!nombreUpdate||loading}>Guardar</button>
              <button type="button" className="btn btn--ghost" onClick={()=>{setIduUpdate('');setNombreUpdate('');}} disabled={loading}>Cancelar</button>
            </div>
          </form>
        </section>
      )}

      {tab==='borrar' && (
        <section className="crud-section">
          <h3 className="crud-title">Borrar USUARIO</h3>
          <form className="form" onSubmit={borrar}>
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input className="input" value={iduDelete} onChange={e=>setIduDelete(e.target.value)} disabled={loading} />
              </div>
            </div>
            <div className="actions">
              <button className={`btn btn--danger ${(!iduDelete||loading)?'btn--disabled':''}`} disabled={!iduDelete||loading}>Eliminar</button>
            </div>
          </form>
        </section>
      )}

      <section className="card" style={{ marginTop: 12 }}>
        <h3 className="crud-title" style={{ marginBottom: 8 }}>Listado de USUARIOS</h3>
        {error && <div style={{color:'red', padding:8, marginBottom:8}}>⚠️ {error}</div>}
        {loading && <div className="empty">Cargando…</div>}
        {!loading && usuarios.length===0 && <div className="empty">Sin usuarios.</div>}
        {!loading && usuarios.length>0 && (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr style={{ borderBottom:'2px solid #ddd', textAlign:'left' }}>
              <th style={{ padding:'12px 8px' }}>IDU</th>
              <th style={{ padding:'12px 8px' }}>Nombre</th>
            </tr></thead>
            <tbody>
              {usuarios.map(u=>(
                <tr key={u.idu} style={{ borderBottom:'1px solid #eee' }}>
                  <td style={{ padding:'12px 8px' }}>{u.idu}</td>
                  <td style={{ padding:'12px 8px' }}>{u.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
