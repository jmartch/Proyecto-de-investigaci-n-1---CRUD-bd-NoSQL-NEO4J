import React, { useState } from "react";
import "../styles/Menu.css";

export default function Menu({ onSelect }) {
  const [submenu, setSubmenu] = useState(false);

  return (
    <div className="menu-container">
      <h2>Menú Principal</h2>
      <button onClick={() => onSelect("usuario")}>Gestionar Usuarios</button>
      <button onClick={() => onSelect("post")}>Gestionar Posts</button>
      <button onClick={() => onSelect("comentario")}>Gestionar Comentarios</button>

      <button onClick={() => setSubmenu(!submenu)}>
        Consultas Especiales ▾
      </button>

      {submenu && (
        <div className="submenu">
          <button onClick={() => onSelect("consulta1")}>Consulta 1: Posts por Usuario</button>
          <button onClick={() => onSelect("consulta2")}>Consulta 2: Comentarios de un Post</button>
        </div>
      )}
    </div>
  );
}
