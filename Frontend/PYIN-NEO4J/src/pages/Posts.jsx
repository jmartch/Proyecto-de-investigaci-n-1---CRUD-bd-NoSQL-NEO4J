import { useState } from "react";

export default function Posts() {
  const [tab, setTab] = useState("insertar"); // insertar | actualizar | borrar

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
          <h3 className="crud-title">Insertar POST</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDP</label>
                <input className="input" placeholder="Ingrese IDP" />
              </div>
              <div className="field">
                <label className="label">Contenido *</label>
                <input className="input" placeholder="Ingrese contenido del post" />
              </div>
            </div>
            <div className="actions">
              <button className="btn btn--primary btn--disabled" type="button" disabled>
                Insertar post
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ACTUALIZAR */}
      {tab === "actualizar" && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar POST</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDP *</label>
                <input className="input" placeholder="IDP existente" />
              </div>
              <div className="field">
                <label className="label">Nuevo contenido *</label>
                <input className="input" placeholder="Contenido actualizado" />
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
          <h3 className="crud-title">Borrar POST</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">IDP *</label>
                <input className="input" placeholder="IDP del post a eliminar" />
              </div>
              <div className="field">
                <label className="label">Contenido *</label>
                <input className="input" placeholder="Contenido asociado (opcional)" />
              </div>
            </div>
            <div className="actions">
              <button className="btn btn--danger btn--disabled" type="button" disabled>
                Eliminar post
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tabla (visual) */}
      <section className="card" style={{ marginTop: 12 }}>
        <h3 className="crud-title" style={{ marginBottom: 8 }}>Listado de POSTS</h3>
        <div className="empty">No hay posts para mostrar.</div>
      </section>
    </div>
  );
}
