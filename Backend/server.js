const express = require('express');
const cors = require('cors');
//Documentacion
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



const usuarioRoutes = require('./routes/usuario');
const postRoutes = require('./routes/post');
const comentarioRoutes = require('./routes/comentario');
const consultasRoutes = require('./routes/consultas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/posts', postRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/consultas', consultasRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log('🚀 Servidor corriendo en http://localhost:3000'));
console.log('Swagger UI disponible en http://localhost:3000/api-docs');
