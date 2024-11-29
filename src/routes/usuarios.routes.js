import express from 'express';
import { getAllUsuarios, createUsuario } from '../controladores/usuarios.Ctrl.js';
const router = express.Router();

router.get('/', getAllUsuarios);
router.post('/', createUsuario);

export default router;
