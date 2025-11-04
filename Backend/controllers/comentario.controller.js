console.log("✅ Controlador de comentarios cargado correctamente");
const Comentario = require("../models/comentario.model");

// 🟢 CREATE
exports.create = async (req, res) => {
  try {
    console.log("🟡 [DEBUG] Entrando a createComentario...");
    console.log("📦 Body recibido:", req.body);

    const { consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp } = req.body;

    if (!consec || !contenidoCom || !idu || !idp) {
      console.warn("⚠️ [DEBUG] Faltan campos obligatorios");
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    console.log("🔍 [DEBUG] Llamando al modelo con datos:", { consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp });

    const result = await Comentario.createComentario({ consec, contenidoCom, fechoraCom, fechoraAut, likeNotLike, idu, idp });

    console.log("✅ [DEBUG] Resultado Neo4j:", result);

    if (!result || !result.records) {
      return res.status(500).json({ message: "Sin respuesta de Neo4j" });
    }

    if (result.records.length === 0) {
      return res.status(404).json({ message: 'No se encontró el usuario o el post para asociar el comentario' });
    }

    const comentario = result.records[0].get('c').properties;
    res.status(201).json({ message: 'Comentario creado exitosamente', data: comentario });

  } catch (error) {
    console.error('❌ [DEBUG] Error al crear comentario:', error);
    res.status(500).json({ message: 'Error al crear comentario', error: error.message });
  }
};

// 🟣 GET ALL
exports.getAll = async (req, res) => {
  try {
    console.log("🟡 [DEBUG] Entrando a getAllComentarios...");
    const result = await Comentario.getAllComentarios();
    console.log("✅ [DEBUG] Comentarios obtenidos:", result.records.length);

    const comentarios = result.records.map(r => ({
      ...r.get("c").properties,
      idu: r.get("idu"),
      idp: r.get("idp")
    }));

    res.status(200).json(comentarios);
  } catch (error) {
    console.error("❌ [DEBUG] Error al obtener comentarios:", error);
    res.status(500).json({ message: "Error al obtener comentarios", error: error.message });
  }
};

// 🟠 UPDATE
exports.update = async (req, res) => {
  try {
    const { consec } = req.params;
    const { contenidoCom } = req.body;
    const result = await Comentario.updateComentario(consec, contenidoCom);

    if (result.records.length === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json({
      message: "Comentario actualizado exitosamente",
      data: result.records[0].get("c").properties
    });
  } catch (error) {
    console.error("❌ Error al actualizar comentario:", error);
    res.status(500).json({ message: "Error al actualizar comentario", error: error.message });
  }
};

// 🔴 DELETE
exports.delete = async (req, res) => {
  try {
    const { consec } = req.params;
    await Comentario.deleteComentario(consec);
    res.status(200).json({ message: "Comentario eliminado exitosamente" });
  } catch (error) {
    console.error("❌ Error al eliminar comentario:", error);
    res.status(500).json({ message: "Error al eliminar comentario", error: error.message });
  }
};
