import { conmysql } from '../db.js';

// Obtener motivaciones
export const getMotivaciones = async (req, res) => {
  try {
    const [motivaciones] = await conmysql.query('SELECT * FROM motivaciones');
    res.json(motivaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las motivaciones', error });
  }
};
