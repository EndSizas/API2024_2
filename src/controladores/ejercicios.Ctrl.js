import { conmysql } from '../db.js';

// Obtener todos los ejercicios (Método GET)
export const getEjercicios = async (req, res) => {
  try {
    const [ejercicios] = await conmysql.query('SELECT * FROM ejercicios');
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ejercicios', error });
  }
};

// Obtener ejercicio por ID (Método GET por ID)
export const getEjercicioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [ejercicio] = await conmysql.query('SELECT * FROM ejercicios WHERE usr_id = ?', [id]);
    if (ejercicio.length === 0) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    res.json(ejercicio[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ejercicio', error });
  }
};

// Crear un nuevo ejercicio (Método POST)
export const createEjercicio = async (req, res) => {
  const { nombre, descripcion, categoria, duracion, dificultad } = req.body;

  // Validación de campos
  if (!nombre || !descripcion || !categoria || !duracion || !dificultad) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const [result] = await conmysql.query(
      'INSERT INTO ejercicios (nombre, descripcion, categoria, duracion, dificultad) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, categoria, duracion, dificultad]
    );

    res.status(201).json({ message: 'Ejercicio creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ejercicio', error });
  }
};
