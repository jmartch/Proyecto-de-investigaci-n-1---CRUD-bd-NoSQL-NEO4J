const { session } = require('../config/db');

module.exports = {
  async createComentario({ consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp }) {
    return session.run(`
      MATCH (u:USUARIO {idu: $idu}), (p:POST {idp: $idp})
      CREATE (u)-[:HACE]->(c:COMENTARIO {
        consec: $consec,
        contenidoCom: $contenidoCom,
        fechoraCom: $fechoraCom,
        fechoraAut: $fechoraAut,
        likeNotLike: $likeNotLike
      })-[:TIENE]->(p)
      RETURN c
    `, { consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp });
  },
  async updateComentario(consec, contenidoCom) {
    return session.run('MATCH (c:COMENTARIO {consec: $consec}) SET c.contenidoCom = $contenidoCom RETURN c', { consec, contenidoCom });
  },
  async deleteComentario(consec) {
    return session.run('MATCH (c:COMENTARIO {consec: $consec}) DETACH DELETE c', { consec });
  }
};
