import { conmysql } from '../db.js';

// Obtener todas las rutinas
export const getRutinas = async (req, res) => {
  try {
    const [rutinas] = await conmysql.query('SELECT * FROM rutinas');
    res.json(rutinas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutinas', error });
  }
};

// Obtener una rutina por ID
export const getRutinaById = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la URL
  try {
    const [rutinas] = await conmysql.query('SELECT * FROM rutinas WHERE id = ?', [id]);
    if (rutinas.length === 0) {
      return res.status(404).json({ message: 'Rutina no encontrada' });
    }
    res.json(rutinas[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la rutina', error });
  }
};

// Crear una nueva rutina (POST)
export const createRutina = async (req, res) => {
  const { nombre, descripcion, nivel, id_usuario } = req.body;

  // Validación de campos
  if (!nombre || !descripcion || !nivel || !id_usuario) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Insertar nueva rutina
    const [result] = await conmysql.query(
      'INSERT INTO rutinas (nombre, descripcion, nivel, id_usuario, FechaCreacion) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [nombre, descripcion, nivel, id_usuario]
    );

    res.status(201).json({ message: 'Rutina creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la rutina', error });
  }
};
