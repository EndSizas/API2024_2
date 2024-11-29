import express from 'express';
import { getAllUsuarios, createUsuario, loginUsuario } from '../controladores/usuarios.Ctrl.js';
const router = express.Router();

// Obtener todos los usuarios
router.get('/', getAllUsuarios);

// Crear un nuevo usuario (registro)
router.post('/register', createUsuario);

// Iniciar sesión
router.post('/login', loginUsuario);

export default router;
