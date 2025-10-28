const express = require('express');
const cors = require('cors');
const { initialize } = require('./config/db');

// Documentación
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usuarioRoutes = require('./routes/usuario');
const postRoutes = require('./routes/post');
const comentarioRoutes = require('./routes/comentario');
const consultasRoutes = require('./routes/consultas');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/consultas', consultasRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// IMPORTANTE: Función async para inicializar antes de escuchar
async function startServer() {
  try {
    console.log('🔄 Inicializando base de datos...');
    await initialize(); // Esperar a que Neo4j esté listo
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
      console.log(`✅ Base de datos conectada y lista`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error.message);
    process.exit(1); // Salir si no se puede conectar a la DB
  }
}

// Manejar cierre graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  const { close } = require('./config/db');
  await close();
  process.exit(0);
});

// Iniciar servidor
startServer();