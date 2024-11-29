import { Router } from 'express';
import { getPerfiles, getPerfilById, createOrUpdatePerfil } from '../controladores/perfil.Ctrl.js';

const router = Router();

// Obtener todos los perfiles
router.get('/', getPerfiles);

// Obtener un perfil de un usuario por ID
router.get('/:usuario_id', getPerfilById);

// Crear o actualizar el perfil
router.post('/:usuario_id', createOrUpdatePerfil);

export default router;
