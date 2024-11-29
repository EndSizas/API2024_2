import { conmysql } from '../db.js';

// Obtener perfil de un usuario
export const getPerfil = async (req, res) => {
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

// Crear o actualizar perfil
export const createOrUpdatePerfil = async (req, res) => {
  const { usuario_id } = req.params;
  const { altura, peso, genero, edad, objetivo } = req.body;
  try {
    const [result] = await conmysql.query(
      'INSERT INTO perfil (usuario_id, altura, peso, genero, edad, objetivo) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE altura = ?, peso = ?, genero = ?, edad = ?, objetivo = ?',
      [usuario_id, altura, peso, genero, edad, objetivo, altura, peso, genero, edad, objetivo]
    );
    res.status(200).json({ message: 'Perfil actualizado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear o actualizar el perfil', error });
  }
};
