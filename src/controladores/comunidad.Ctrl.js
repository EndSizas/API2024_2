import { conmysql } from '../db.js';

// Obtener toda la comunidad (Método GET)
export const getComunidad = async (req, res) => {
  try {
    const [comunidad] = await conmysql.query('SELECT * FROM comunidad');
    res.json(comunidad);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la comunidad', error });
  }
};

// Obtener comunidad por ID (Método GET por ID)
export const getComunidadById = async (req, res) => {
  const { id } = req.params;
  try {
    const [comunidad] = await conmysql.query('SELECT * FROM comunidad WHERE usr_id = ?', [id]);
    if (comunidad.length === 0) {
      return res.status(404).json({ message: 'Comunidad no encontrada' });
    }
    res.json(comunidad[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la comunidad', error });
  }
};

// Crear una nueva entrada en la comunidad (Método POST)
export const createComunidad = async (req, res) => {
  const { nombre, descripcion, tipo, fecha_creacion } = req.body;

  // Validación de campos
  if (!nombre || !descripcion || !tipo || !fecha_creacion) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const [result] = await conmysql.query(
      'INSERT INTO comunidad (nombre, descripcion, tipo, fecha_creacion) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, tipo, fecha_creacion]
    );

    res.status(201).json({ message: 'Comunidad creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la comunidad', error });
  }
};
