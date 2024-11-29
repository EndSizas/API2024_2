import express from 'express';
import { getNotificaciones } from '../controladores/notificaciones.Ctrl.js';
const router = express.Router();

router.get('/', getNotificaciones);

export default router;
