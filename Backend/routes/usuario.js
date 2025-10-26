const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

//Crear un usuario
router.post('/', usuarioCtrl.create);

//Actualizar usuario 
router.put('/:idu', usuarioCtrl.update);

//eliminar usuario 
router.delete('/:idu', usuarioCtrl.delete);

module.exports = router;
