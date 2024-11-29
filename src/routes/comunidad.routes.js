import { Router } from 'express';
import { getComunidad, getComunidadById, createComunidad } from '../controladores/comunidad.Ctrl.js';

const router = Router();

// Obtener toda la comunidad
router.get('/', getComunidad);

// Obtener una comunidad por ID
router.get('/:id', getComunidadById);

// Crear una nueva comunidad
router.post('/', createComunidad);

export default router;
