const Comentario = require('../models/comentario.model');

exports.create = async (req, res) => {
  try {
    await Comentario.createComentario(req.body);
    res.send('Comentario creado correctamente');
  } catch (err) {
    res.status(500).send('Error al crear el comentario: ' + err.message);
  }
};

exports.update = async (req, res) => {
  try {
    await Comentario.updateComentario(req.params.consec, req.body.contenidoCom);
    res.send('Comentario actualizado correctamente');
  } catch (err) {
    res.status(500).send('Error al actualizar el comentario: ' + err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Comentario.deleteComentario(req.params.consec);
    res.send('Comentario eliminado correctamente');
  } catch (err) {
    res.status(500).send('Error al eliminar el comentario: ' + err.message);
  }
};
