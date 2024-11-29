import express from 'express';
import { getComunidad } from '../controladores/comunidad.Ctrl.js';
const router = express.Router();

router.get('/', getComunidad);

export default router;
