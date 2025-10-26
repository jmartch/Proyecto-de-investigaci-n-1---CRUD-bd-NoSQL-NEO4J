const Usuario = require('../models/usuario.model');

exports.create = async (req, res) => {
  try {
    await Usuario.createUsuario(req.body);
    res.send('Usuario creado');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    await Usuario.updateUsuario(req.params.idu, req.body.nombre);
    res.send('Usuario actualizado');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Usuario.deleteUsuario(req.params.idu);
    res.send('Usuario eliminado');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
