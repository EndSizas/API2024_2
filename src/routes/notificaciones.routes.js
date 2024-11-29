import { Router } from 'express';
import { getAllNotificaciones, getNotificacionById, createNotificacion } from '../controladores/notificaciones.Ctrl.js';

const router = Router();

// Obtener todas las notificaciones
router.get('/', getAllNotificaciones);

// Obtener una notificación por ID
router.get('/:id', getNotificacionById);

// Crear una nueva notificación
router.post('/', createNotificacion);

export default router;
