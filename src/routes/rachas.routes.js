import { Router } from 'express';
import { getRachas, getRachaById, createRacha } from '../controladores/rachas.Ctrl.js';

const router = Router();

// Obtener todas las rachas
router.get('/', getRachas);

// Obtener una racha por ID
router.get('/:id', getRachaById);

// Crear una nueva racha (registro)
router.post('/', createRacha);

export default router;
