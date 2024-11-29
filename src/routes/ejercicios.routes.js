import { Router } from 'express';
import { getAllEjercicios, getEjercicioById, createEjercicio } from '../controladores/ejercicios.Ctrl.js';

const router = Router();

// Obtener todos los ejercicios
router.get('/', getAllEjercicios);

// Obtener un ejercicio por ID
router.get('/:id', getEjercicioById);

// Crear un nuevo ejercicio
router.post('/', createEjercicio);

export default router;
