import { Router } from 'express';
import { getNotificaciones, getNotificacionById, createNotificacion } from '../controladores/notificaciones.Ctrl.js';

const router = Router();

// Obtener todas las notificaciones
router.get('/', getNotificaciones);

// Obtener una notificación por ID
router.get('/:id', getNotificacionById);

// Crear una nueva notificación
router.post('/', createNotificacion);

export default router;
