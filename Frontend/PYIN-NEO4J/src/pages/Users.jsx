import { useState, useEffect } from "react";

const API_URL = 'http://localhost:3000/api';

export default function Users() {
  const [tab, setTab] = useState("insertar");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para formulario Insertar
  const [nuevoIdu, setNuevoIdu] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");

  // Estados para formulario Actualizar
  const [actualizarIdu, setActualizarIdu] = useState("");
  const [actualizarNombre, setActualizarNombre] = useState("");

  // Estados para formulario Borrar
  const [borrarIdu, setBorrarIdu] = useState("");

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // LISTAR USUARIOS
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/usuarios/`);
      
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  // INSERTAR USUARIO
  const handleInsertar = async (e) => {
    e.preventDefault();
    
    if (!nuevoIdu.trim() || !nuevoNombre.trim()) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idu: nuevoIdu, 
          nombre: nuevoNombre 
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al crear usuario');
      }
      
      // Limpiar formulario
      setNuevoIdu("");
      setNuevoNombre("");
      
      // Recargar lista
      await cargarUsuarios();
      
      alert("✅ Usuario creado exitosamente");
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ACTUALIZAR USUARIO
  const handleActualizar = async (e) => {
    e.preventDefault();
    
    if (!actualizarIdu.trim() || !actualizarNombre.trim()) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/usuarios/${actualizarIdu}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nombre: actualizarNombre 
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al actualizar usuario');
      }
      
      // Limpiar formulario
      setActualizarIdu("");
      setActualizarNombre("");
      
      // Recargar lista
      await cargarUsuarios();
      
      alert("✅ Usuario actualizado exitosamente");
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // BORRAR USUARIO
  const handleBorrar = async (e) => {
    e.preventDefault();
    
    if (!borrarIdu.trim()) {
      alert("Por favor ingrese el IDU");
      return;
    }

    if (!confirm(`¿Está seguro de eliminar el usuario con IDU: ${borrarIdu}?`)) {
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/usuarios/${borrarIdu}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al eliminar usuario');
      }
      
      // Limpiar formulario
      setBorrarIdu("");
      
      // Recargar lista
      await cargarUsuarios();
      
      alert("✅ Usuario eliminado exitosamente");
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarActualizar = () => {
    setActualizarIdu("");
    setActualizarNombre("");
  };

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      {/* Tabs */}
      <div className="crud-tabs" style={{ marginBottom: 12 }}>
        <button
          className={`crud-tab ${tab === "insertar" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("insertar")}
        >
          Insertar
        </button>
        <button
          className={`crud-tab ${tab === "actualizar" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("actualizar")}
        >
          Actualizar
        </button>
        <button
          className={`crud-tab ${tab === "borrar" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("borrar")}
        >
          Borrar
        </button>
      </div>

      {/* INSERTAR */}
      {tab === "insertar" && (
        <section className="crud-section">
          <h3 className="crud-title">Insertar USUARIO</h3>
          <form className="form" onSubmit={handleInsertar}>
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input
                  className="input"
                  placeholder="Ingrese IDU"
                  value={nuevoIdu}
                  onChange={(e) => setNuevoIdu(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label className="label">Nombre *</label>
                <input
                  className="input"
                  placeholder="Ingrese nombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="actions">
              <button
                className={`btn btn--primary ${loading || !nuevoIdu || !nuevoNombre ? "btn--disabled" : ""}`}
                type="submit"
                disabled={loading || !nuevoIdu || !nuevoNombre}
              >
                {loading ? "Insertando..." : "Insertar usuario"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ACTUALIZAR */}
      {tab === "actualizar" && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar USUARIO</h3>
          <form className="form" onSubmit={handleActualizar}>
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input
                  className="input"
                  placeholder="IDU existente"
                  value={actualizarIdu}
                  onChange={(e) => setActualizarIdu(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label className="label">Nuevo nombre *</label>
                <input
                  className="input"
                  placeholder="Nombre actualizado"
                  value={actualizarNombre}
                  onChange={(e) => setActualizarNombre(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="actions">
              <button
                className={`btn btn--primary ${loading || !actualizarIdu || !actualizarNombre ? "btn--disabled" : ""}`}
                type="submit"
                disabled={loading || !actualizarIdu || !actualizarNombre}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                className="btn btn--ghost"
                type="button"
                onClick={handleCancelarActualizar}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {/* BORRAR */}
      {tab === "borrar" && (
        <section className="crud-section">
          <h3 className="crud-title">Borrar USUARIO</h3>
          <form className="form" onSubmit={handleBorrar}>
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input
                  className="input"
                  placeholder="IDU a eliminar"
                  value={borrarIdu}
                  onChange={(e) => setBorrarIdu(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="actions">
              <button
                className={`btn btn--danger ${loading || !borrarIdu ? "btn--disabled" : ""}`}
                type="submit"
                disabled={loading || !borrarIdu}
              >
                {loading ? "Eliminando..." : "Eliminar usuario"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tabla */}
      <section className="card" style={{ marginTop: 12 }}>
        <h3 className="crud-title" style={{ marginBottom: 8 }}>
          Listado de USUARIOS
        </h3>

        {error && (
          <div style={{ color: "red", padding: "8px", marginBottom: "8px" }}>
            ⚠️ {error}
          </div>
        )}

        {loading && <div className="empty">Cargando usuarios...</div>}

        {!loading && usuarios.length === 0 && (
          <div className="empty">No hay usuarios para mostrar.</div>
        )}

        {!loading && usuarios.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                <th style={{ padding: "12px 8px", fontWeight: 600 }}>IDU</th>
                <th style={{ padding: "12px 8px", fontWeight: 600 }}>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.idu} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px 8px" }}>{usuario.idu}</td>
                  <td style={{ padding: "12px 8px" }}>{usuario.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}