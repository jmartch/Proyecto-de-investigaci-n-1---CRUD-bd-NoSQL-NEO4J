import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Posts() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ userId: '', title: '', body: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    try {
      setLoading(true);
      const data = await api('/posts');
      setList(data || []);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onCreate(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await api('/posts', { method: 'POST', body: JSON.stringify(form) });
      setForm({ userId:'', title:'', body:'' });
      await load();
      setMsg('Post creado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate(id) {
    try {
      setLoading(true);
      await api(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(form) });
      setEditingId(null);
      setForm({ userId:'', title:'', body:'' });
      await load();
      setMsg('Post actualizado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar post?')) return;
    try {
      setLoading(true);
      await api(`/posts/${id}`, { method: 'DELETE' });
      await load();
      setMsg('Post eliminado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(p) {
    setEditingId(p.id || p._id);
    setForm({
      userId: p.userId || p.user_id || '',
      title: p.title || '',
      body: p.body || '',
    });
  }

  return (
    <section>
      <h2>Posts</h2>

      <form onSubmit={editingId ? (e)=>{e.preventDefault(); onUpdate(editingId);} : onCreate}
            style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
        <input name="userId" value={form.userId} onChange={onChange} placeholder="ID de Usuario (owner)" required />
        <input name="title" value={form.title} onChange={onChange} placeholder="Título" required />
        <textarea name="body" value={form.body} onChange={onChange} placeholder="Contenido" rows={4} required />
        <button type="submit" disabled={loading}>
          {editingId ? 'Guardar cambios' : 'Crear post'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ userId:'', title:'', body:'' }); }}>
            Cancelar edición
          </button>
        )}
      </form>

      <hr style={{ margin: '16px 0' }} />

      {loading && <p>Cargando...</p>}
      {msg && <p><small>{msg}</small></p>}

      <ul style={{ paddingLeft: 16 }}>
        {list.map(p => {
          const id = p.id || p._id;
          return (
            <li key={id} style={{ marginBottom: 12 }}>
              <b>({p.userId || p.user_id}) {p.title}</b>
              <p style={{ margin: '4px 0' }}>{p.body}</p>
              <button onClick={() => startEdit(p)}>Editar</button>{' '}
              <button onClick={() => onDelete(id)}>Eliminar</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
