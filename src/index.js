import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js';
import ejerciciosRoutes from './routes/ejercicios.routes.js';
import perfilRoutes from './routes/perfil.routes.js'; // Actualizado
import comunidadRoutes from './routes/comunidad.routes.js';
import motivacionesRoutes from './routes/motivaciones.routes.js';
import notificacionesRoutes from './routes/notificaciones.routes.js';
import rachasRoutes from './routes/rachas.routes.js';
import recompensasRoutes from './routes/recompensas.routes.js';
import rutinasRoutes from './routes/rutinas.routes.js';
import procesosRoutes from './routes/procesos.routes.js';
import cors from 'cors'; // Agregado para habilitar CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las rutas

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use('/api/ejercicios', ejerciciosRoutes);
app.use('/api/perfil', perfilRoutes); // Ruta actualizada
app.use('/api/comunidad', comunidadRoutes);
app.use('/api/motivaciones', motivacionesRoutes);
app.use('/api/notificaciones', notificacionesRoutes);
app.use('/api/rachas', rachasRoutes);
app.use('/api/recompensas', recompensasRoutes);
app.use('/api/procesos', procesosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
