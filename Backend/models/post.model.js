const { getSession } = require('../config/db');

module.exports = {
  // ✅ Obtener todos los posts
  async getAllPosts() {
    const session = getSession();
    try {
      return await session.run(`
        MATCH (u:USUARIO)-[:PUBLICA]->(p:POST)
        RETURN p.idp as idp, p.contenido as contenido, u.idu as idu, u.nombre as nombreUsuario
        ORDER BY p.idp DESC
      `);
    } finally {
      await session.close();
    }
  },

  // ✅ Crear post
  async createPost({ idp, contenido, idu }) {
    const session = getSession();
    try {
      // Primero verificar si el post ya existe
      const checkPost = await session.run(
        'MATCH (p:POST {idp: $idp}) RETURN p',
        { idp }
      );
      
      if (checkPost.records.length > 0) {
        throw new Error(`El post con IDP '${idp}' ya existe`);
      }

      // Crear el post
      const result = await session.run(`
        MATCH (u:USUARIO {idu: $idu})
        CREATE (u)-[:PUBLICA]->(p:POST {idp: $idp, contenido: $contenido})
        RETURN p.idp as idp, p.contenido as contenido, u.idu as idu, u.nombre as nombreUsuario
      `, { idp, contenido, idu });
      
      if (result.records.length === 0) {
        throw new Error(`Usuario con IDU '${idu}' no encontrado`);
      }
      
      return result.records[0].toObject();
    } finally {
      await session.close();
    }
  },

  // ✅ Actualizar post
  async updatePost(idp, contenido) {
    const session = getSession();
    try {
      const result = await session.run(`
        MATCH (u:USUARIO)-[:PUBLICA]->(p:POST {idp: $idp})
        SET p.contenido = $contenido
        RETURN p.idp as idp, p.contenido as contenido, u.idu as idu, u.nombre as nombreUsuario
      `, { idp, contenido });
      
      if (result.records.length === 0) {
        return null;
      }
      
      return result.records[0].toObject();
    } finally {
      await session.close();
    }
  },

  // ✅ Eliminar post
  async deletePost(idp) {
    const session = getSession();
    try {
      const result = await session.run(
        'MATCH (p:POST {idp: $idp}) DETACH DELETE p RETURN count(p) as deleted',
        { idp }
      );
      
      const deleted = result.records[0].get('deleted');
      return deleted.toNumber ? deleted.toNumber() > 0 : deleted > 0;
    } finally {
      await session.close();
    }
  }
};