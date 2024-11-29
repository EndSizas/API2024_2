import express from 'express';
import { getAllEjercicios } from '../controladores/ejercicios.Ctrl.js';
const router = express.Router();

router.get('/', getAllEjercicios);

export default router;
