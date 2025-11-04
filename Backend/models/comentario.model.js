// models/comentario.model.js
const { getSession } = require('../config/db');

module.exports = {
  async createComentario({ consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp }) {
    const session = getSession();                 // <-- Faltaba
    try {
      // Si en Neo4j idu/idp son números, convierte: const iduNum = toInteger($idu) en el MATCH
      const result = await session.run(`
        MATCH (u:USUARIO {idu: $idu})
        MATCH (p:POST {idp: $idp})
        WITH u, p
        CREATE (u)-[:HACE]->(c:COMENTARIO {
          consec: $consec,
          contenidoCom: $contenidoCom,
          fechoraCom: $fechoraCom,
          fechoraAut: $fechoraAut,
          likeNotLike: $likeNotLike
        })-[:TIENE]->(p)
        RETURN c
      `, { consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp });
      return result;
    } finally {
      await session.close();                      // <-- Importante
    }
  },

  async getAllComentarios() {
    const session = getSession();
    try {
      return await session.run(`
        MATCH (u:USUARIO)-[:HACE]->(c:COMENTARIO)-[:TIENE]->(p:POST)
        RETURN c, u.idu AS idu, p.idp AS idp
        ORDER BY c.fechoraCom DESC
      `);
    } finally {
      await session.close();
    }
  },

  async updateComentario(consec, contenidoCom) {
    const session = getSession();
    try {
      return await session.run(`
        MATCH (c:COMENTARIO {consec: $consec})
        SET c.contenidoCom = $contenidoCom
        RETURN c
      `, { consec, contenidoCom });
    } finally {
      await session.close();
    }
  },

  async deleteComentario(consec) {
    const session = getSession();
    try {
      return await session.run(`
        MATCH (c:COMENTARIO {consec: $consec})
        DETACH DELETE c
      `, { consec });
    } finally {
      await session.close();
    }
  }
};
