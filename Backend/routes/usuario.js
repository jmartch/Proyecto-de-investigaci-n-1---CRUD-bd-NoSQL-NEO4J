const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

// LISTAR todos los usuarios 
router.get('/', usuarioCtrl.getAllUsuarios);

// Crear un usuario
router.post('/', usuarioCtrl.create);

// Actualizar usuario 
router.put('/:idu', usuarioCtrl.update);

// Eliminar usuario 
router.delete('/:idu', usuarioCtrl.delete);

module.exports = router;