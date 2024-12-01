import { conmysql } from '../db.js';

// Obtener todas las motivaciones (Método GET)
export const getMotivaciones = async (req, res) => {
  try {
    const [motivaciones] = await conmysql.query('SELECT * FROM motivaciones');
    res.json(motivaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las motivaciones', error });
  }
};

// Obtener motivación por ID (Método GET por ID)
export const getMotivacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [motivacion] = await conmysql.query('SELECT * FROM motivaciones WHERE usr_id = ?', [id]);
    if (motivacion.length === 0) {
      return res.status(404).json({ message: 'Motivación no encontrada' });
    }
    res.json(motivacion[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la motivación', error });
  }
};

// Crear una nueva motivación (Método POST)
export const createMotivacion = async (req, res) => {
  const { mensaje, autor, fecha } = req.body;

  // Validación de campos
  if (!mensaje || !autor || !fecha) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const [result] = await conmysql.query(
      'INSERT INTO motivaciones (mensaje, autor, fecha) VALUES (?, ?, ?)',
      [mensaje, autor, fecha]
    );

    res.status(201).json({ message: 'Motivación creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la motivación', error });
  }
};
