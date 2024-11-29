import { Router } from 'express';
import { getAllRutinas, getRutinaById, createRutina } from '../controladores/rutinas.Ctrl.js';

const router = Router();

// Obtener todas las rutinas
router.get('/', getRutinas);

// Obtener una rutina por ID
router.get('/:id', getRutinaById);

// Crear una nueva rutina (registro)
router.post('/', createRutina);

export default router;
