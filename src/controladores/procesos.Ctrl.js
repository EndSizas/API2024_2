import { conmysql } from '../db.js';

// Obtener todos los procesos
export const getAllProcesos = async (req, res) => {
  try {
    const [procesos] = await conmysql.query('SELECT * FROM procesos');
    res.json(procesos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los procesos', error });
  }
};
