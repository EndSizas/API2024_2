import express from 'express';
import { getRachas } from '../controladores/rachas.Ctrl.js';
const router = express.Router();

router.get('/', getRachas);

export default router;
