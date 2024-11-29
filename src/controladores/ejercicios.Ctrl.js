import { conmysql } from '../db.js';

// Obtener todos los ejercicios
export const getAllEjercicios = async (req, res) => {
  try {
    const [ejercicios] = await conmysql.query('SELECT * FROM ejercicios');
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ejercicios', error });
  }
};
