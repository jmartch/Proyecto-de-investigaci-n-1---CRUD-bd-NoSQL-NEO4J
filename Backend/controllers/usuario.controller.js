const Usuario = require('../models/usuario.model');

exports.getAllUsuarios = async (req, res) => {
  try {
    const result = await Usuario.getAllUsuarios();
    const usuarios = result.records.map(record => record.get('u').properties);
    res.json(usuarios); // ✅ Devuelve JSON
  } catch (error) {
    console.error('Error en getAllUsuarios:', error);
    res.status(500).json({ error: error.message }); // ✅ Error también en JSON
  }
};

exports.create = async (req, res) => {
  try {
    const { idu, nombre } = req.body;
    
    console.log('📝 Recibiendo datos:', { idu, nombre }); // Debug
    
    if (!idu || !nombre) {
      return res.status(400).json({ 
        error: 'Se requieren los campos: idu y nombre' 
      });
    }

    const usuario = await Usuario.createUsuario(req.body);
    
    // ✅ IMPORTANTE: Devolver JSON con los datos creados
    res.status(201).json({ 
      message: 'Usuario creado exitosamente',
      usuario: usuario
    });
  } catch (err) {
    console.error('❌ Error creando usuario:', err);
    
    if (err.message.includes('ya existe')) {
      return res.status(409).json({ error: err.message });
    }
    
    res.status(500).json({ error: err.message }); // ✅ Error en JSON
  }
};

exports.update = async (req, res) => {
  try {
    const { idu } = req.params;
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ 
        error: 'Se requiere el campo: nombre' 
      });
    }

    const usuario = await Usuario.updateUsuario(idu, nombre);
    
    if (!usuario) {
      return res.status(404).json({ 
        error: `Usuario con IDU '${idu}' no encontrado` 
      });
    }
    
    // ✅ Devolver JSON
    res.json({ 
      message: 'Usuario actualizado exitosamente',
      usuario: usuario
    });
  } catch (err) {
    console.error('❌ Error actualizando usuario:', err);
    res.status(500).json({ error: err.message }); // ✅ Error en JSON
  }
};

exports.delete = async (req, res) => {
  try {
    const { idu } = req.params;
    
    const deleted = await Usuario.deleteUsuario(idu);
    
    if (!deleted) {
      return res.status(404).json({ 
        error: `Usuario con IDU '${idu}' no encontrado` 
      });
    }
    
    // ✅ Devolver JSON
    res.json({ 
      message: 'Usuario eliminado exitosamente',
      idu: idu
    });
  } catch (err) {
    console.error('❌ Error eliminando usuario:', err);
    res.status(500).json({ error: err.message }); // ✅ Error en JSON
  }
};