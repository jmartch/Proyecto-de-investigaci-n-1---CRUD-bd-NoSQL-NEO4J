const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');

// ✅ Obtener todos los posts
router.get('/', postCtrl.getAllPosts);

// Crear un post
router.post('/', postCtrl.create);

// Actualizar post por id
router.put('/:idp', postCtrl.update);

// Eliminar post por id
router.delete('/:idp', postCtrl.delete);

module.exports = router;