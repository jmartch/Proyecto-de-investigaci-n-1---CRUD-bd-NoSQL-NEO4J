const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://127.0.0.1:7687',
  neo4j.auth.basic('neo4j', 'admin2025')
);

let databaseName = 'neo4j';
let isInitialized = false;

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
      console.log(`📊 Usando base de datos: ${dbName}`);
      return dbName;
    }
    
    throw new Error('No hay bases de datos activas');
  } catch (err) {
    console.error('⚠️ Error obteniendo base de datos:', err.message);
    return 'neo4j';
  } finally {
    await systemSession.close();
  }
}

async function createSchema(dbName) {
  const session = driver.session({ database: dbName });
  
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
    
    console.log("✅ Constraints creadas correctamente");
  } catch (err) {
    if (!err.message.includes('equivalent constraint already exists')) {
      console.error("❌ Error creando constraints:", err.message);
      throw err;
    }
  } finally {
    await session.close();
  }
}

async function initialize() {
  if (isInitialized) {
    console.log('ℹ️ Base de datos ya inicializada');
    return;
  }
  
  try {
    console.log('🔌 Conectando a Neo4j...');
    
    // Verificar conexión
    const session = driver.session();
    await session.run('RETURN 1');
    await session.close();
    
    databaseName = await getAvailableDatabase();
    await createSchema(databaseName);
    
    isInitialized = true;
    console.log("✅ Base de datos inicializada correctamente");
  } catch (error) {
    console.error('❌ Error en inicialización:', error.message);
    throw new Error(`No se pudo conectar a Neo4j: ${error.message}`);
  }
}

function getSession() {
  if (!isInitialized) {
    console.warn('⚠️ Intentando obtener sesión antes de inicializar');
  }
  return driver.session({ database: databaseName });
}

async function close() {
  try {
    await driver.close();
    console.log('📪 Conexión a Neo4j cerrada');
  } catch (error) {
    console.error('❌ Error cerrando conexión:', error.message);
  }
}

module.exports = { 
  driver, 
  getSession,
  initialize,
  close,
  databaseName 
};