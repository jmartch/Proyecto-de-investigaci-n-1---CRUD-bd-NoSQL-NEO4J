import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Users() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    try {
      setLoading(true);
      const data = await api('/users');
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
      await api('/users', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setForm({ name: '', email: '' });
      await load();
      setMsg('Usuario creado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate(id) {
    try {
      setLoading(true);
      await api(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setEditingId(null);
      setForm({ name: '', email: '' });
      await load();
      setMsg('Usuario actualizado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar usuario?')) return;
    try {
      setLoading(true);
      await api(`/users/${id}`, { method: 'DELETE' });
      await load();
      setMsg('Usuario eliminado');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(u) {
    setEditingId(u.id || u._id);
    setForm({ name: u.name || '', email: u.email || '' });
  }

  return (
    <section>
      <h2>Usuarios</h2>

      <form onSubmit={editingId ? (e)=>{e.preventDefault(); onUpdate(editingId);} : onCreate}
            style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Nombre" required />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" required />
        <button type="submit" disabled={loading}>
          {editingId ? 'Guardar cambios' : 'Crear usuario'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ name:'', email:'' }); }}>
            Cancelar edición
          </button>
        )}
      </form>

      <hr style={{ margin: '16px 0' }} />

      {loading && <p>Cargando...</p>}
      {msg && <p><small>{msg}</small></p>}

      <ul style={{ paddingLeft: 16 }}>
        {list.map(u => {
          const id = u.id || u._id;
          return (
            <li key={id} style={{ marginBottom: 8 }}>
              <b>{u.name}</b> — {u.email}{' '}
              <button onClick={() => startEdit(u)}>Editar</button>{' '}
              <button onClick={() => onDelete(id)}>Eliminar</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
