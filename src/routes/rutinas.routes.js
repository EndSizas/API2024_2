import express from 'express';
import { getAllRutinas } from '../controladores/rutinas.Ctrl.js';
const router = express.Router();

router.get('/', getAllRutinas);

export default router;
