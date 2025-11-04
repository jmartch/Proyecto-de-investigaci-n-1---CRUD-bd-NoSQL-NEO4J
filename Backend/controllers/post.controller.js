const Post = require('../models/post.model');

// ✅ Obtener todos los posts
exports.getAllPosts = async (req, res) => {
  try {
    const result = await Post.getAllPosts();
    const posts = result.records.map(record => ({
      idp: record.get('idp'),
      contenido: record.get('contenido'),
      idu: record.get('idu'),
      nombreUsuario: record.get('nombreUsuario')
    }));
    res.json(posts);
  } catch (error) {
    console.error('Error en getAllPosts:', error);
    res.status(500).json({ error: error.message });
  }
};
// ✅ Crear post
exports.create = async (req, res) => {
  try {
    const { idp, contenido, idu } = req.body;
    
    console.log('📝 Recibiendo datos:', { idp, contenido, idu });
    
    if (!idp || !contenido || !idu) {
      return res.status(400).json({ 
        error: 'Se requieren los campos: idp, contenido y idu' 
      });
    }

    const post = await Post.createPost(req.body);
    
    res.status(201).json({ 
      message: 'Post creado exitosamente',
      post: post
    });
  } catch (err) {
    console.error('❌ Error creando post:', err);
    
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    
    if (err.message.includes('ya existe')) {
      return res.status(409).json({ error: err.message });
    }
    
    res.status(500).json({ error: err.message });
  }
};

// ✅ Actualizar post
exports.update = async (req, res) => {
  try {
    const { idp } = req.params;
    const { contenido } = req.body;
    
    if (!contenido) {
      return res.status(400).json({ 
        error: 'Se requiere el campo: contenido' 
      });
    }

    const post = await Post.updatePost(idp, contenido);
    
    if (!post) {
      return res.status(404).json({ 
        error: `Post con IDP '${idp}' no encontrado` 
      });
    }
    
    res.json({ 
      message: 'Post actualizado exitosamente',
      post: post
    });
  } catch (err) {
    console.error('❌ Error actualizando post:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Eliminar post
exports.delete = async (req, res) => {
  try {
    const { idp } = req.params;
    
    const deleted = await Post.deletePost(idp);
    
    if (!deleted) {
      return res.status(404).json({ 
        error: `Post con IDP '${idp}' no encontrado` 
      });
    }
    
    res.json({ 
      message: 'Post eliminado exitosamente',
      idp: idp
    });
  } catch (err) {
    console.error('❌ Error eliminando post:', err);
    res.status(500).json({ error: err.message });
  }
};