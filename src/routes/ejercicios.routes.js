import { Router } from 'express';
import { getEjercicios, getEjercicioById, createEjercicio } from '../controladores/ejercicios.Ctrl.js';

const router = Router();

// Obtener todos los ejercicios
router.get('/', getEjercicios);

// Obtener un ejercicio por ID
router.get('/:id', getEjercicioById);

// Crear un nuevo ejercicio
router.post('/', createEjercicio);

export default router;
