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

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la URL
  try {
    const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Crear un nuevo usuario (registro)
export const createUsuario = async (req, res) => {
  const { usr_nombre, usr_correo, usr_usuario, usr_clave } = req.body;

  // Validación de campos
  if (!usr_nombre || !usr_correo || !usr_usuario || !usr_clave) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el correo o el usuario ya existen
    const [existingUser] = await conmysql.query(
      'SELECT * FROM usuarios WHERE usr_correo = ? OR usr_usuario = ?',
      [usr_correo, usr_usuario]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'El correo o el usuario ya están registrados' });
    }

    // Insertar nuevo usuario
    const [result] = await conmysql.query(
      'INSERT INTO usuarios (usr_nombre, usr_correo, usr_usuario, usr_clave, FechaRegistro) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [usr_nombre, usr_correo, usr_usuario, usr_clave]
    );

    res.status(201).json({ message: 'Usuario creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Iniciar sesión (login)
export const loginUsuario = async (req, res) => {
  const { usr_usuario, usr_clave } = req.body;

  // Validación de campos
  if (!usr_usuario || !usr_clave) {
    return res.status(400).json({ message: 'Usuario y clave son requeridos' });
  }

  try {
    // Buscar el usuario en la base de datos
    const [rows] = await conmysql.query(
      'SELECT * FROM usuarios WHERE usr_usuario = ? AND usr_clave = ?',
      [usr_usuario, usr_clave]
    );

    // Verificar si las credenciales coinciden
    if (rows.length > 0) {
      // Si el usuario es encontrado, devolver los datos del usuario (puedes agregar un token JWT aquí si deseas)
      res.json({ message: 'Login exitoso', usuario: rows[0] });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar el login', error });
  }
};

