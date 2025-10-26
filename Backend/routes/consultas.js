const express = require('express');
const router = express.Router();
const { session } = require('../config/db');

// CONSULTA 1
router.get('/posts-usuario', async (req, res) => {
  const result = await session.run(`
    MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)
    WHERE u.nombre <> "ANONIMO" AND u.nombre <> "MANAGER"
    RETURN u.nombre AS usuario, p.contenido AS post
  `);
  res.json(result.records.map(r => r.toObject()));
});

// CONSULTA 2
router.get('/comentarios-post', async (req, res) => {
  const result = await session.run(`
    MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)<-[:TIENE]-(c:COMENTARIO)<-[:HACE]-(aut:USUARIO)
    RETURN 
      u.nombre AS usuarioPost,
      p.contenido AS post,
      c.contenidoCom AS comentario,
      c.fechoraCom AS fechaComentario,
      c.fechoraAut AS fechaAutorizacion,
      aut.nombre AS autorComentario,
      c.likeNotLike AS tipo
  `);
  res.json(result.records.map(r => r.toObject()));
});

module.exports = router;
