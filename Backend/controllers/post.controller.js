const Post = require('../models/post.model');

exports.create = async (req, res) => {
  try {
    await Post.createPost(req.body);
    res.send('Post creado correctamente');
  } catch (err) {
    res.status(500).send('Error al crear el post: ' + err.message);
  }
};

exports.update = async (req, res) => {
  try {
    await Post.updatePost(req.params.idp, req.body.contenido);
    res.send('Post actualizado correctamente');
  } catch (err) {
    res.status(500).send('Error al actualizar el post: ' + err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Post.deletePost(req.params.idp);
    res.send('Post eliminado correctamente');
  } catch (err) {
    res.status(500).send('Error al eliminar el post: ' + err.message);
  }
};
