import express from 'express';
import { getMotivaciones } from '../controladores/motivaciones.Ctrl.js';
const router = express.Router();

router.get('/', getMotivaciones);

export default router;
