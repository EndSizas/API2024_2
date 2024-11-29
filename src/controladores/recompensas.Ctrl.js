import { conmysql } from '../db.js';

// Obtener recompensas
export const getRecompensas = async (req, res) => {
  try {
    const [recompensas] = await conmysql.query('SELECT * FROM recompensas');
    res.json(recompensas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recompensas', error });
  }
};
