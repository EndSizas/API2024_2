import { conmysql } from '../db.js';

// Obtener comunidad
export const getComunidad = async (req, res) => {
  try {
    const [comunidad] = await conmysql.query('SELECT * FROM comunidad');
    res.json(comunidad);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la comunidad', error });
  }
};
