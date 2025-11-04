// routes/comentario.js
const express = require('express');
const router = express.Router();
const comentarioCtrl = require('../controllers/comentario.controller');

// 🔹 Crear comentario
router.post('/', comentarioCtrl.create);

// 🔹 Obtener todos los comentarios
router.get('/consulta', comentarioCtrl.getAll);

// 🔹 Actualizar comentario
router.put('/:consec', comentarioCtrl.update);

// 🔹 Eliminar comentario
router.delete('/:consec', comentarioCtrl.delete);

module.exports = router;
