import { useState, useEffect } from "react";
import "../styles/UserTable.css";


export default function UserForm({ onSubmit, selectedUser, onCancel }) {
  const [formData, setFormData] = useState({
    idu: "",
    nombre: "",
    correo: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({ idu: "", nombre: "", correo: "" });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ idu: "", nombre: "", correo: "" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{selectedUser ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <input
        type="text"
        name="idu"
        placeholder="ID Usuario"
        value={formData.idu}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button type="submit">{selectedUser ? "Actualizar" : "Crear"}</button>
        {selectedUser && (
          <button type="button" onClick={onCancel} className="cancel">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
