// routes/consultas.js
const express = require('express');
const router = express.Router();
const { getSession } = require('../config/db');

router.get('/consulta1', async (req, res) => {
  console.log('[consulta1] originalUrl=', req.originalUrl, ' query=', req.query); // <-- LOG CLAVE

  // Acepta idu o user o q (por si hay caches / versiones viejas)
  const idu = req.query.idu?.toString().trim();
  const user = req.query.user?.toString().trim();
  const q    = req.query.q?.toString().trim();

  if (!idu && !user && !q) {
    return res.status(400).json({ error: 'Debes enviar ?idu=... o ?user=... (o ?q=...)' });
  }

  const session = getSession();
  try {
    let cypher, params;

    if (idu) {
      cypher = `
        MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)
        WHERE toString(u.idu) = toString($idu)
        RETURN p.idp AS idp, p.titulo AS titulo, p.contenido AS contenido
        ORDER BY p.idp
      `;
      params = { idu };
    } else {
      // compat: user/q puede ser nombre visible o idu
      const query = (user || q).toLowerCase();
      cypher = `
        MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)
        WHERE toLower(coalesce(u.nombre,'')) = $q
           OR toLower(coalesce(u.idu,''))    = $q
        RETURN p.idp AS idp, p.titulo AS titulo, p.contenido AS contenido
        ORDER BY p.idp
      `;
      params = { q: query };
    }

    const result = await session.run(cypher, params);
    const posts = result.records.map(r => ({
      idp: r.get('idp'),
      titulo: r.get('titulo'),
      contenido: r.get('contenido'),
    }));
    return res.json(posts);
  } catch (e) {
    console.error('Error en consulta1:', e);
    return res.status(500).json({ error: 'Error al buscar posts del usuario' });
  } finally {
    await session.close();
  }
});
// GET /api/consultas/consulta2?idu=juanangel
router.get('/consulta2', async (req, res) => {
  const { idu, user } = req.query;
  if (!idu && !user) {
    return res.status(400).json({ error: 'Debes enviar ?idu=... (o ?user=... para compatibilidad)' });
  }

  const session = getSession();
  try {
    let cypher, params;

    if (idu) {
      // Por código único de usuario (recomendado)
      cypher = `
        MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)
        WHERE toString(u.idu) = toString($idu)
        OPTIONAL MATCH (p)<-[:TIENE]-(c:COMENTARIO)<-[:HACE]-(aut:USUARIO)
        WITH u, p, c, aut
        WHERE c IS NOT NULL
        RETURN
          p.idp AS idp,
          p.titulo AS titulo,
          c.contenidoCom AS contenidoCom,
          c.fechoraCom AS fechoraCom,
          c.fechoraAut AS fechoraAut,
          aut.idu AS autorComentarioId,
          aut.nombre AS autorComentarioNombre,
          c.likeNotLike AS likeNotLike
        ORDER BY c.fechoraCom DESC
      `;
      params = { idu: String(idu).trim() };
    } else {
      // Compatibilidad por nombre visible o idu en minúsculas
      cypher = `
        MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)
        WHERE toLower(coalesce(u.nombre,'')) = $q
           OR toLower(coalesce(u.idu,''))    = $q
        OPTIONAL MATCH (p)<-[:TIENE]-(c:COMENTARIO)<-[:HACE]-(aut:USUARIO)
        WITH u, p, c, aut
        WHERE c IS NOT NULL
        RETURN
          p.idp AS idp,
          p.titulo AS titulo,
          c.contenidoCom AS contenidoCom,
          c.fechoraCom AS fechoraCom,
          c.fechoraAut AS fechoraAut,
          aut.idu AS autorComentarioId,
          aut.nombre AS autorComentarioNombre,
          c.likeNotLike AS likeNotLike
        ORDER BY c.fechoraCom DESC
      `;
      params = { q: String(user).trim().toLowerCase() };
    }

    const result = await session.run(cypher, params);
    const rows = result.records.map(r => ({
      idp: r.get('idp'),
      titulo: r.get('titulo'),
      contenidoCom: r.get('contenidoCom'),
      fechoraCom: r.get('fechoraCom'),
      fechoraAut: r.get('fechoraAut'),
      autorComentarioId: r.get('autorComentarioId'),
      autorComentarioNombre: r.get('autorComentarioNombre'),
      likeNotLike: r.get('likeNotLike'),
    }));

    return res.json(rows);
  } catch (err) {
    console.error('Error en consulta2:', err);
    return res.status(500).json({ error: 'Error al obtener comentarios' });
  } finally {
    await session.close();
  }
}); 

module.exports = router;
