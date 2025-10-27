import { useState } from "react";

export default function Users() {
  const [tab, setTab] = useState("insertar"); // insertar | actualizar | borrar

  return (
    <div className="container" style={{paddingTop: 8}}>
      {/* Tabs */}
      <div className="crud-tabs" style={{marginBottom: 12}}>
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
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDU</label>
                <input className="input" placeholder="Ingrese IDU" />
              </div>
              <div className="field">
                <label className="label">Nombre *</label>
                <input className="input" placeholder="Ingrese nombre" />
              </div>
            </div>
            <div className="actions">
              <button className="btn btn--primary btn--disabled" type="button" disabled>
                Insertar usuario
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ACTUALIZAR */}
      {tab === "actualizar" && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar USUARIO</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input className="input" placeholder="IDU existente" />
              </div>
              <div className="field">
                <label className="label">Nuevo nombre *</label>
                <input className="input" placeholder="Nombre actualizado" />
              </div>
            </div>
            <div className="actions">
              <button className="btn btn--primary btn--disabled" type="button" disabled>
                Guardar cambios
              </button>
              <button className="btn btn--ghost btn--disabled" type="button" disabled>
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
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDU *</label>
                <input className="input" placeholder="IDU a eliminar" />
              </div>
              <div className="field">
                <label className="label">Nombre *</label>
                <input className="input" placeholder="Nombre asociado" />
              </div>
            </div>
            <div className="actions">
              <button className="btn btn--danger btn--disabled" type="button" disabled>
                Eliminar usuario
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tabla (visual) */}
      <section className="card" style={{marginTop: 12}}>
        <h3 className="crud-title" style={{marginBottom: 8}}>Listado de USUARIOS</h3>
        <div className="empty">No hay usuarios para mostrar.</div>
      </section>
    </div>
  );
}

