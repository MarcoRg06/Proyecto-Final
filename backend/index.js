const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",       
  user: "root",
  password: "12345",
  database: "registro_alumnos",
});

db.connect(err => {
  if (err) {
    console.log("Error de conexión: ", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});


// POST para registrar alumnos
app.post("/alumnos", (req, res) => {
  const { numero_control, nombre, carrera, correo_electronico, telefono } = req.body;

  if (!numero_control || !nombre || !carrera || !correo_electronico || !telefono) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const query = `
    INSERT INTO alumnos (numero_control, nombre, carrera, correo_electronico, telefono)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [numero_control, nombre, carrera, correo_electronico, telefono], (err, result) => {
    if (err) {
      console.error(" Error al insertar:", err);
      return res.status(500).json({ error: "Error al registrar alumno" });
    }
    res.status(201).json({ message: "✅ Alumno registrado correctamente", id: result.insertId });
  });
});

// PUT para actualizar alumnos por número de control
app.put("/alumnos/:numero_control", (req, res) => {
  const numeroControl = req.params.numero_control;
  const { nombre, carrera, correo_electronico, telefono } = req.body;

  console.log("Número control recibido:", numeroControl);
  console.log("Datos recibidos:", { nombre, carrera, correo_electronico, telefono });  

  const query = `
    UPDATE alumnos 
    SET nombre = ?, carrera = ?, correo_electronico = ?, telefono = ?
    WHERE numero_control = ?
  `;

  db.query(query, [nombre, carrera, correo_electronico, telefono, numeroControl], (err, result) => {
    if (err) {
      console.error("Error al actualizar alumno:", err);
      return res.status(500).json({ error: "Error al actualizar alumno" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    
    res.json({ message: "✅ Alumno actualizado correctamente" });
  });
});

// GET para obtener todos los alumnos
app.get("/alumnos", (req, res) => {
  const query = `SELECT * FROM alumnos`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(" Error al obtener alumnos:", err);
      return res.status(500).json({ error: "Error al obtener alumnos" });
    }
    res.json(results); // devuelve array de alumnos
  });
});

// DELETE para eliminar un alumno por número de control (CORREGIDO)
app.delete("/alumnos/:numero_control", (req, res) => {
  const numeroControl = req.params.numero_control;
  
  console.log("Eliminando alumno con número de control:", numeroControl); // Para debug
  
  const query = `DELETE FROM alumnos WHERE numero_control = ?`;
  
  db.query(query, [numeroControl], (err, result) => {
    if (err) {
      console.error("Error al eliminar alumno:", err);
      return res.status(500).json({ error: "Error al eliminar alumno" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    
    res.json({ message: "✅ Alumno eliminado correctamente" });
  });
});
// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, "192.168.0.106", () => {
  console.log(`Servidor corriendo en http://192.168.0.106:${PORT}`);
});
