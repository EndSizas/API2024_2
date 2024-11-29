import express from 'express';
import { getRecompensas } from '../controladores/recompensas.Ctrl.js';
const router = express.Router();

router.get('/', getRecompensas);

export default router;
