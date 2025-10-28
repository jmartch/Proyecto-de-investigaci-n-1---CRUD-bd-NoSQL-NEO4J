const { getSession } = require('../config/db');

module.exports = {
  // ✅ Obtener todos los usuarios
  async getAllUsuarios() {
    const session = getSession();
    try {
      return await session.run('MATCH (u:USUARIO) RETURN u');
    } finally {
      await session.close();
    }
  },

  // ✅ Crear usuario
  async createUsuario({ idu, nombre }) {
    const session = getSession();
    try {
      const result = await session.run(
        'CREATE (u:USUARIO {idu: $idu, nombre: $nombre}) RETURN u', 
        { idu, nombre }
      );
      
      // Retornar las propiedades del usuario creado
      return result.records[0].get('u').properties;
    } finally {
      await session.close();
    }
  },

  // ✅ Actualizar usuario
  async updateUsuario(idu, nombre) {
    const session = getSession();
    try {
      const result = await session.run(
        'MATCH (u:USUARIO {idu: $idu}) SET u.nombre = $nombre RETURN u', 
        { idu, nombre }
      );
      
      // Si no se encontró el usuario, retornar null
      if (result.records.length === 0) {
        return null;
      }
      
      // Retornar las propiedades del usuario actualizado
      return result.records[0].get('u').properties;
    } finally {
      await session.close();
    }
  },

  // ✅ Eliminar usuario
  async deleteUsuario(idu) {
    const session = getSession();
    try {
      const result = await session.run(
        'MATCH (u:USUARIO {idu: $idu}) DETACH DELETE u RETURN count(u) as deleted', 
        { idu }
      );
      
      // Retornar true si se eliminó, false si no existía
      return result.records[0].get('deleted').toNumber() > 0;
    } finally {
      await session.close();
    }
  }
};