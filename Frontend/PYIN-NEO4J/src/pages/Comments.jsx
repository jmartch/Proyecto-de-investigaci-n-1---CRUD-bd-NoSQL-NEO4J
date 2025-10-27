import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Comments() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    postId: '',
    userId: '',
    content: '',
    like: false, // true: megusta, false: nomegusta
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    try {
      setLoading(true);
      const data = await api('/comments');
      setList(data || []);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function onCreate(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await api('/comments', { method: 'POST', body: JSON.stringify(form) });
      setForm({ postId:'', userId:'', content:'', like:false });
      await load();
      setMsg('Comentario creado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate(id) {
    try {
      setLoading(true);
      await api(`/comments/${id}`, { method: 'PUT', body: JSON.stringify(form) });
      setEditingId(null);
      setForm({ postId:'', userId:'', content:'', like:false });
      await load();
      setMsg('Comentario actualizado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar comentario?')) return;
    try {
      setLoading(true);
      await api(`/comments/${id}`, { method: 'DELETE' });
      await load();
      setMsg('Comentario eliminado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(c) {
    setEditingId(c.id || c._id);
    setForm({
      postId: c.postId || c.post_id || '',
      userId: c.userId || c.user_id || '',
      content: c.content || c.comment || '',
      like: !!(c.like ?? c.megusta), // acepta variantes
    });
  }

  return (
    <section>
      <h2>Comentarios</h2>

      <form onSubmit={editingId ? (e)=>{e.preventDefault(); onUpdate(editingId);} : onCreate}
            style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
        <input name="postId" value={form.postId} onChange={onChange} placeholder="ID del Post" required />
        <input name="userId" value={form.userId} onChange={onChange} placeholder="ID del Usuario" required />
        <textarea name="content" value={form.content} onChange={onChange} placeholder="Comentario" rows={3} required />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" name="like" checked={form.like} onChange={onChange} />
          ¿Me gusta? (desmarcado = No me gusta)
        </label>
        <button type="submit" disabled={loading}>
          {editingId ? 'Guardar cambios' : 'Crear comentario'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ postId:'', userId:'', content:'', like:false }); }}>
            Cancelar edición
          </button>
        )}
      </form>

      <hr style={{ margin: '16px 0' }} />

      {loading && <p>Cargando...</p>}
      {msg && <p><small>{msg}</small></p>}

      <ul style={{ paddingLeft: 16 }}>
        {list.map(c => {
          const id = c.id || c._id;
          const like = !!(c.like ?? c.megusta);
          return (
            <li key={id} style={{ marginBottom: 12 }}>
              <b>Post {c.postId || c.post_id} — User {c.userId || c.user_id}</b>
              <p style={{ margin: '4px 0' }}>{c.content || c.comment}</p>
              <small>{like ? '👍 Me gusta' : '👎 No me gusta'}</small>
              <div>
                <button onClick={() => startEdit(c)}>Editar</button>{' '}
                <button onClick={() => onDelete(id)}>Eliminar</button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
