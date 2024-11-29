import { conmysql } from '../db.js';

// Obtener todas las rutinas
export const getAllRutinas = async (req, res) => {
  try {
    const [rutinas] = await conmysql.query('SELECT * FROM rutinas');
    res.json(rutinas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutinas', error });
  }
};
