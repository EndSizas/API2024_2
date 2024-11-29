import { conmysql } from '../db.js';

// Obtener todos los perfiles (Método GET)
export const getAllPerfiles = async (req, res) => {
  try {
    const [perfiles] = await conmysql.query('SELECT * FROM perfil');
    res.json(perfiles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los perfiles', error });
  }
};

// Obtener perfil de un usuario por ID (Método GET por ID)
export const getPerfilById = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const [perfil] = await conmysql.query('SELECT * FROM perfil WHERE usuario_id = ?', [usuario_id]);
    if (perfil.length === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.json(perfil[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error });
  }
};

// Crear o actualizar el perfil (Método POST)
export const createOrUpdatePerfil = async (req, res) => {
  const { usuario_id } = req.params;
  const { altura, peso, genero, edad, objetivo } = req.body;
  
  // Validación de campos
  if (!altura || !peso || !genero || !edad || !objetivo) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const [result] = await conmysql.query(
      'INSERT INTO perfil (usuario_id, altura, peso, genero, edad, objetivo) VALUES (?, ?, ?, ?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE altura = ?, peso = ?, genero = ?, edad = ?, objetivo = ?',
      [usuario_id, altura, peso, genero, edad, objetivo, altura, peso, genero, edad, objetivo]
    );

    res.status(200).json({ message: 'Perfil creado o actualizado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear o actualizar el perfil', error });
  }
};

