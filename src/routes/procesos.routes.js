import { Router } from 'express';
import { getProcesos, getProcesoById, createProceso } from '../controladores/procesos.Ctrl.js';

const router = Router();

// Obtener todos los procesos
router.get('/', getProcesos);

// Obtener un proceso por ID
router.get('/:id', getProcesoById);

// Crear un nuevo proceso (registro)
router.post('/', createProceso);

export default router;
