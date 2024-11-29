import { conmysql } from '../db.js';

// Obtener notificaciones
export const getNotificaciones = async (req, res) => {
  try {
    const [notificaciones] = await conmysql.query('SELECT * FROM notificaciones');
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notificaciones', error });
  }
};
