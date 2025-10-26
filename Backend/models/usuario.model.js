const { session } = require('../config/db');

module.exports = {
  async createUsuario({ idu, nombre }) {
    return session.run('CREATE (u:USUARIO {idu: $idu, nombre: $nombre}) RETURN u', { idu, nombre });
  },
  async updateUsuario(idu, nombre) {
    return session.run('MATCH (u:USUARIO {idu: $idu}) SET u.nombre = $nombre RETURN u', { idu, nombre });
  },
  async deleteUsuario(idu) {
    return session.run('MATCH (u:USUARIO {idu: $idu}) DETACH DELETE u', { idu });
  }
};
