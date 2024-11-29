import express from 'express';
import { getPerfil, createOrUpdatePerfil } from '../controladores/perfil.Ctrl.js';
const router = express.Router();

router.get('/:usuario_id', getPerfil);
router.put('/:usuario_id', createOrUpdatePerfil);

export default router;
