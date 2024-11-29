import express from 'express';
import { getAllProcesos } from '../controladores/procesos.Ctrl.js';
const router = express.Router();

router.get('/', getAllProcesos);

export default router;
