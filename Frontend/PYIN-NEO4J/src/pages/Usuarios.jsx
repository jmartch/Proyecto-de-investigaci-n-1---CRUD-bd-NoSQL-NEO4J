import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const API_URL = "http://localhost:3000/api/usuarios";

  // Cargar usuarios
  const fetchUsuarios = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    const usuarios = data.records
      ? data.records.map((r) => r._fields[0].properties)
      : data;
    setUsers(usuarios);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Crear o actualizar usuario
  const handleSubmit = async (formData) => {
    const method = selectedUser ? "PUT" : "POST";
    const url = selectedUser
      ? `${API_URL}/${formData.idu}`
      : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setSelectedUser(null);
    fetchUsuarios();
  };

  // Editar usuario
  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  // Eliminar usuario
  const handleDelete = async (idu) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    await fetch(`${API_URL}/${idu}`, { method: "DELETE" });
    fetchUsuarios();
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Gestión de Usuarios</h1>
      <UserForm
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
        onCancel={() => setSelectedUser(null)}
      />
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
