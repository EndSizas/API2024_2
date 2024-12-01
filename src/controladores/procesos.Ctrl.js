import { conmysql } from '../db.js';

// Obtener todos los procesos
export const getProcesos = async (req, res) => {
  try {
    const [procesos] = await conmysql.query('SELECT * FROM procesos');
    res.json(procesos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los procesos', error });
  }
};

// Obtener un proceso por ID
export const getProcesoById = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la URL
  try {
    const [procesos] = await conmysql.query('SELECT * FROM procesos WHERE usr_id = ?', [id]);
    if (procesos.length === 0) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }
    res.json(procesos[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proceso', error });
  }
};

// Crear un nuevo proceso (POST)
export const createProceso = async (req, res) => {
  const { nombre, descripcion, id_usuario } = req.body;

  // Validación de campos
  if (!nombre || !descripcion || !id_usuario) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Insertar nuevo proceso
    const [result] = await conmysql.query(
      'INSERT INTO procesos (nombre, descripcion, id_usuario, FechaCreacion) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
      [nombre, descripcion, id_usuario]
    );

    res.status(201).json({ message: 'Proceso creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proceso', error });
  }
};

