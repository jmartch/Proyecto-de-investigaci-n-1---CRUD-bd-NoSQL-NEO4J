import "../styles/UserTable.css";


export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u.idu}>
              <td>{u.idu}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>
                <button onClick={() => onEdit(u)}>✏️</button>
                <button onClick={() => onDelete(u.idu)}>🗑️</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No hay usuarios registrados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
