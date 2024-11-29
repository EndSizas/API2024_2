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
