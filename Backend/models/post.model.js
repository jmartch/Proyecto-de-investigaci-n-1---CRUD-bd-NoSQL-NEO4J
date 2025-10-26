const { session } = require('../config/db');

module.exports = {
  async createPost({ idp, contenido, idu }) {
    return session.run(`
      MATCH (u:USUARIO {idu: $idu})
      CREATE (u)-[:PUBLICA]->(p:POST {idp: $idp, contenido: $contenido})
      RETURN p
    `, { idp, contenido, idu });
  },
  async updatePost(idp, contenido) {
    return session.run('MATCH (p:POST {idp: $idp}) SET p.contenido = $contenido RETURN p', { idp, contenido });
  },
  async deletePost(idp) {
    return session.run('MATCH (p:POST {idp: $idp}) DETACH DELETE p', { idp });
  }
};
