import { Router } from 'express';
import { getRecompensas, getRecompensaById, createRecompensa } from '../controladores/recompensas.Ctrl.js';

const router = Router();

// Obtener todas las recompensas
router.get('/', getRecompensas);

// Obtener una recompensa por ID
router.get('/:id', getRecompensaById);

// Crear una nueva recompensa (registro)
router.post('/', createRecompensa);

export default router;
