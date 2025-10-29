import { useState, useEffect } from "react";

export default function Comments() {
  const [tab, setTab] = useState("insertar"); // insertar | actualizar | borrar
  const [fechaComen, setFechaComen] = useState("");
  const [fechaAutor, setFechaAutor] = useState("");

  // 👉 Función para obtener fecha y hora actual en formato YYYY-MM-DD HH:mm
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 🔄 Cada vez que el tab cambie, actualizamos las fechas automáticamente
  useEffect(() => {
    if (tab === "insertar" || tab === "actualizar") {
      const current = getCurrentDateTime();
      setFechaComen(current);
      setFechaAutor(current);
    }
  }, [tab]);

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
          <h3 className="crud-title">Insertar COMENTARIO</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">consec *</label>
                <input className="input" placeholder="Código/llave del comentario" />
              </div>
              <div className="field">
                <label className="label">fechacomen *</label>
                <input
                  className="input"
                  value={fechaComen}
                  readOnly
                />
              </div>
            </div>

            <div className="field-row" style={{ marginTop: 12 }}>
              <div className="field">
                <label className="label">likenotlike *</label>
                <input className="input" placeholder="megusta / nomegusta" />
              </div>
              <div className="field">
                <label className="label">fechaautor *</label>
                <input
                  className="input"
                  value={fechaAutor}
                  readOnly
                />
              </div>
            </div>

            <div className="field-row" style={{ marginTop: 12 }}>
              <div className="field" style={{ flex: "1 1 100%" }}>
                <label className="label">contenidocomen *</label>
                <input className="input" placeholder="Contenido del comentario" />
              </div>
            </div>

            <div className="actions">
              <button className="btn btn--primary btn--disabled" type="button" disabled>
                Insertar comentario
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ACTUALIZAR */}
      {tab === "actualizar" && (
        <section className="crud-section">
          <h3 className="crud-title">Actualizar COMENTARIO</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">consec *</label>
                <input className="input" placeholder="Código existente" />
              </div>
              <div className="field">
                <label className="label">fechacomen *</label>
                <input
                  className="input"
                  value={fechaComen}
                  readOnly
                />
              </div>
            </div>

            <div className="field-row" style={{ marginTop: 12 }}>
              <div className="field">
                <label className="label">likenotlike *</label>
                <input className="input" placeholder="megusta / nomegusta" />
              </div>
              <div className="field">
                <label className="label">fechaautor *</label>
                <input
                  className="input"
                  value={fechaAutor}
                  readOnly
                />
              </div>
            </div>

            <div className="field-row" style={{ marginTop: 12 }}>
              <div className="field" style={{ flex: "1 1 100%" }}>
                <label className="label">contenidocomen *</label>
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
          <h3 className="crud-title">Borrar COMENTARIO</h3>
          <form className="form">
            <div className="field-row">
              <div className="field">
                <label className="label">consec *</label>
                <input className="input" placeholder="Código a eliminar" />
              </div>
            </div>

            <div className="actions">
              <button className="btn btn--danger btn--disabled" type="button" disabled>
                Eliminar comentario
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tabla (visual) */}
      <section className="card" style={{ marginTop: 12 }}>
        <h3 className="crud-title" style={{ marginBottom: 8 }}>
          Listado de COMENTARIOS
        </h3>
        <div className="empty">No hay comentarios para mostrar.</div>
      </section>
    </div>
  );
}
