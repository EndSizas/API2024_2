import { conmysql } from '../db.js';

// Obtener todas las rachas
export const getRachas = async (req, res) => {
  try {
    const [rachas] = await conmysql.query('SELECT * FROM rachas');
    res.json(rachas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rachas', error });
  }
};

// Obtener una racha por ID
export const getRachaById = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la URL
  try {
    const [rachas] = await conmysql.query('SELECT * FROM rachas WHERE usr_id = ?', [id]);
    if (rachas.length === 0) {
      return res.status(404).json({ message: 'Racha no encontrada' });
    }
    res.json(rachas[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la racha', error });
  }
};

// Crear una nueva racha (POST)
export const createRacha = async (req, res) => {
  const { nombre, descripcion, puntos, id_usuario } = req.body;

  // Validación de campos
  if (!nombre || !descripcion || !puntos || !id_usuario) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Insertar nueva racha
    const [result] = await conmysql.query(
      'INSERT INTO rachas (nombre, descripcion, puntos, id_usuario, FechaCreacion) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [nombre, descripcion, puntos, id_usuario]
    );

    res.status(201).json({ message: 'Racha creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la racha', error });
  }
};
