import { conmysql } from '../db.js';

// Obtener todos los usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  const { usr_nombre, usr_correo, usr_usuario, usr_clave } = req.body;
  try {
    const [result] = await conmysql.query(
      'INSERT INTO usuarios (usr_nombre, usr_correo, usr_usuario, usr_clave) VALUES (?, ?, ?, ?)',
      [usr_nombre, usr_correo, usr_usuario, usr_clave]
    );
    res.status(201).json({ message: 'Usuario creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};
