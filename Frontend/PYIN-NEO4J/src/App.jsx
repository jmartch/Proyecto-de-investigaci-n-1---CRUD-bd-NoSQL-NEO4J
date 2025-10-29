import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Posts from "./pages/Posts";
import Comentarios from "./pages/Comentarios";
import Consultas from "./pages/Consultas";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/comentarios" element={<Comentarios />} />
              <Route path="/consultas" element={<Consultas />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
