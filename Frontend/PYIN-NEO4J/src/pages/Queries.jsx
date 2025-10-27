import { useState } from "react";

export default function Queries() {
  const [tab, setTab] = useState("c1"); // c1 | c2

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      {/* Submenú de consultas */}
      <div className="crud-tabs" style={{ marginBottom: 12 }}>
        <button
          className={`crud-tab ${tab === "c1" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("c1")}
        >
          CONSULTA 1
        </button>
        <button
          className={`crud-tab ${tab === "c2" ? "crud-tab--active" : ""}`}
          onClick={() => setTab("c2")}
        >
          CONSULTA 2
        </button>
      </div>

      {/* ================= CONSULTA 1 ================= */}
      {tab === "c1" && (
        <>
          <section className="crud-section">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 className="crud-title">CONSULTA 1</h3>

              {/* menú de tres puntos opcional (visual) */}
              <div className="menu-container">
                <button className="menu-trigger">⋮</button>
                <div className="menu-dropdown">
                  <button className="menu-item">Refrescar</button>
                  <button className="menu-item">Exportar</button>
                  <button className="menu-item">Cerrar</button>
                </div>
              </div>
            </div>

            <p className="small" style={{ marginBottom: 12 }}>
              Listar los <b>POST</b> que ha hecho un <b>USUARIO</b> (excluyendo “ANONIMO” y “MANAGER”).
            </p>

            {/* Filtros (solo UI) */}
            <form className="form">
              <div className="field-row">
                <div className="field">
                  <label className="label">Nombre de usuario *</label>
                  <input className="input" placeholder="Ingrese nombre de usuario" />
                </div>
                <div className="field">
                  <label className="label">Exclusiones</label>
                  <input className="input" value="ANONIMO, MANAGER" disabled />
                </div>
              </div>

              <div className="actions">
                <button className="btn btn--primary btn--disabled" type="button" disabled>
                  Ejecutar consulta
                </button>
                <button className="btn btn--ghost btn--disabled" type="button" disabled>
                  Limpiar
                </button>
              </div>
            </form>
          </section>

          {/* Resultados C1 */}
          <section className="card" style={{ marginTop: 12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 className="crud-title" style={{ marginBottom: 8 }}>Resultados – CONSULTA 1</h3>
              <div className="menu-container">
                <button className="menu-trigger">⋮</button>
                <div className="menu-dropdown">
                  <button className="menu-item">Copiar</button>
                  <button className="menu-item">Exportar CSV</button>
                </div>
              </div>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>IDP</th>
                    <th>Contenido</th>
                    <th>Autor (USUARIO)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <div className="empty">No hay resultados para mostrar.</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ================= CONSULTA 2 ================= */}
      {tab === "c2" && (
        <>
          <section className="crud-section">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 className="crud-title">CONSULTA 2</h3>
              <div className="menu-container">
                <button className="menu-trigger">⋮</button>
                <div className="menu-dropdown">
                  <button className="menu-item">Refrescar</button>
                  <button className="menu-item">Exportar</button>
                  <button className="menu-item">Cerrar</button>
                </div>
              </div>
            </div>

            <p className="small" style={{ marginBottom: 12 }}>
              Comentarios de un <b>POST</b> de un usuario, mostrando:
              <i> fecha-hora de creación, el comentario, fecha-hora de autorización, quién autorizó y si fue “megusta” o “nomegusta”.</i>
            </p>

            {/* Filtros (solo UI) */}
            <form className="form">
              <div className="field-row">
                <div className="field">
                  <label className="label">Nombre de usuario *</label>
                  <input className="input" placeholder="Ingrese nombre de usuario" />
                </div>
                <div className="field">
                  <label className="label">ID del POST (IDP) *</label>
                  <input className="input" placeholder="Ingrese IDP del post" />
                </div>
              </div>

              <div className="actions">
                <button className="btn btn--primary btn--disabled" type="button" disabled>
                  Ejecutar consulta
                </button>
                <button className="btn btn--ghost btn--disabled" type="button" disabled>
                  Limpiar
                </button>
              </div>
            </form>
          </section>

          {/* Resultados C2 */}
          <section className="card" style={{ marginTop: 12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 className="crud-title" style={{ marginBottom: 8 }}>Resultados – CONSULTA 2</h3>
              <div className="menu-container">
                <button className="menu-trigger">⋮</button>
                <div className="menu-dropdown">
                  <button className="menu-item">Copiar</button>
                  <button className="menu-item">Exportar CSV</button>
                </div>
              </div>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha creación</th>
                    <th>Comentario</th>
                    <th>Fecha autorización</th>
                    <th>Autorizado por</th>
                    <th>Like/NoLike</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <div className="empty">No hay resultados para mostrar.</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
