import { Router } from 'express';
import { getUsuarios, getUsuarioById, createUsuario, loginUsuario } from '../controladores/usuarios.Ctrl.js';

const router = Router();

// Obtener todos los usuarios
router.get('/', getUsuarios);

// Obtener un usuario por ID
router.get('/:id', getUsuarioById);

// Crear un nuevo usuario (registro)
router.post('/', createUsuario);

// Iniciar sesión (login)
router.post('/login', loginUsuario);

export default router;
