import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";   // estilos globales (ya tienes global.css)
import "./App.css";             // estilos de la app (archivo que te doy más abajo)

/* React 18 createRoot */
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
