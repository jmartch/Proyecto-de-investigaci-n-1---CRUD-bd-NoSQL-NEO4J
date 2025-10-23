import express from "express";
import neo4j from "neo4j-driver";

const app = express();
app.use(express.json());

// Conexión con Neo4j
const driver = neo4j.driver(
  "bolt://localhost:7687",              // URL del servidor
  neo4j.auth.basic("neo4j", "admin2025")  
);

// Ruta de prueba
app.get("/personas", async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run("MATCH (p:Persona) RETURN p LIMIT 5");
    const personas = result.records.map(r => r.get("p").properties);
    res.json(personas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al consultar Neo4j");
  } finally {
    await session.close();
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
