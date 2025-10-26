const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://127.0.0.1:7687',
  neo4j.auth.basic('neo4j', 'admin2025')
);

async function getAvailableDatabase() {
  const systemSession = driver.session({ database: 'system' });
  
  try {
    const result = await systemSession.run(`
      SHOW DATABASES 
      YIELD name, currentStatus 
      WHERE currentStatus = 'online' 
      RETURN name
    `);
    
    if (result.records.length > 0) {
      const dbName = result.records[0].get('name');
      console.log(`Usando base de datos: ${dbName}`);
      return dbName;
    }
    
    throw new Error('No hay bases de datos activas');
  } catch (err) {
    console.error('Error obteniendo base de datos:', err.message);
    return 'neo4j'; // fallback
  } finally {
    await systemSession.close();
  }
}

async function createSchema(databaseName) {
  const session = driver.session({ database: databaseName });
  
  try {
    await session.run(`
      CREATE CONSTRAINT usuario_idu IF NOT EXISTS 
      FOR (u:USUARIO) REQUIRE u.idu IS UNIQUE
    `);
    
    await session.run(`
      CREATE CONSTRAINT post_idp IF NOT EXISTS 
      FOR (p:POST) REQUIRE p.idp IS UNIQUE
    `);
    
    await session.run(`
      CREATE CONSTRAINT comentario_consec IF NOT EXISTS 
      FOR (c:COMENTARIO) REQUIRE c.consec IS UNIQUE
    `);
    
    console.log("Esquema creado correctamente");
  } catch (err) {
    console.error("Error creando esquema:", err.message);
  } finally {
    await session.close();
  }
}

async function initialize() {
  try {
    const dbName = await getAvailableDatabase();
    await createSchema(dbName);
  } catch (error) {
    console.error('Error en inicialización:', error.message);
  }
}

initialize().catch(console.error);

module.exports = { driver };