import { Router } from 'express';
import { getAllMotivaciones, getMotivacionById, createMotivacion } from '../controladores/motivaciones.Ctrl.js';

const router = Router();

// Obtener todas las motivaciones
router.get('/', getAllMotivaciones);

// Obtener una motivación por ID
router.get('/:id', getMotivacionById);

// Crear una nueva motivación
router.post('/', createMotivacion);

export default router;
