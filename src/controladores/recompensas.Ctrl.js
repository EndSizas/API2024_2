import { conmysql } from '../db.js';

// Obtener todas las recompensas
export const getRecompensas = async (req, res) => {
  try {
    const [recompensas] = await conmysql.query('SELECT * FROM recompensas');
    res.json(recompensas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recompensas', error });
  }
};

// Obtener una recompensa por ID
export const getRecompensaById = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la URL
  try {
    const [recompensas] = await conmysql.query('SELECT * FROM recompensas WHERE usr_id = ?', [id]);
    if (recompensas.length === 0) {
      return res.status(404).json({ message: 'Recompensa no encontrada' });
    }
    res.json(recompensas[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la recompensa', error });
  }
};

// Crear una nueva recompensa (POST)
export const createRecompensa = async (req, res) => {
  const { nombre, descripcion, puntos, id_usuario } = req.body;

  // Validación de campos
  if (!nombre || !descripcion || !puntos || !id_usuario) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Insertar nueva recompensa
    const [result] = await conmysql.query(
      'INSERT INTO recompensas (nombre, descripcion, puntos, id_usuario, FechaCreacion) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [nombre, descripcion, puntos, id_usuario]
    );

    res.status(201).json({ message: 'Recompensa creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la recompensa', error });
  }
};
