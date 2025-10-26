const express = require('express');
const router = express.Router();
const comentarioCtrl = require('../controllers/comentario.controller');

// Crear comentario
router.post('/', comentarioCtrl.create);

// Actualizar comentario por consecutivo
router.put('/:consec', comentarioCtrl.update);

// Eliminar comentario por consecutivo
router.delete('/:consec', comentarioCtrl.delete);

module.exports = router;
