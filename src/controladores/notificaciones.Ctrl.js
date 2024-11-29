import { conmysql } from '../db.js';

// Obtener todas las notificaciones (Método GET)
export const getAllNotificaciones = async (req, res) => {
  try {
    const [notificaciones] = await conmysql.query('SELECT * FROM notificaciones');
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notificaciones', error });
  }
};

// Obtener notificación por ID (Método GET por ID)
export const getNotificacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [notificacion] = await conmysql.query('SELECT * FROM notificaciones WHERE id = ?', [id]);
    if (notificacion.length === 0) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    res.json(notificacion[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la notificación', error });
  }
};

// Crear una nueva notificación (Método POST)
export const createNotificacion = async (req, res) => {
  const { usuario_id, mensaje, fecha } = req.body;

  // Validación de campos
  if (!usuario_id || !mensaje || !fecha) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const [result] = await conmysql.query(
      'INSERT INTO notificaciones (usuario_id, mensaje, fecha) VALUES (?, ?, ?)',
      [usuario_id, mensaje, fecha]
    );

    res.status(201).json({ message: 'Notificación creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la notificación', error });
  }
};
