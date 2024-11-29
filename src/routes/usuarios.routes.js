import { Router } from 'express';
import { getAllUsuarios, getUsuarioById, createUsuario, loginUsuario } from '../controladores/usuarios.Ctrl.js';

const router = Router();

// Obtener todos los usuarios
router.get('/', getAllUsuarios);

// Obtener un usuario por ID
router.get('/:id', getUsuarioById);

// Crear un nuevo usuario (registro)
router.post('/', createUsuario);

// Iniciar sesión (login)
router.post('/login', loginUsuario);

export default router;
