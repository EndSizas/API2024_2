import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js';
import perfilRoutes from './routes/perfil.routes.js';
import ejerciciosRoutes from './routes/ejercicios.routes.js';
import rutinasRoutes from './routes/rutinas.routes.js';
import procesosRoutes from './routes/procesos.routes.js';
import notificacionesRoutes from './routes/notificaciones.routes.js';
import rachasRoutes from './routes/rachas.routes.js';
import recompensasRoutes from './routes/recompensas.routes.js';
import motivacionesRoutes from './routes/motivaciones.routes.js';
import comunidadRoutes from './routes/comunidad.routes.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', usuariosRoutes);
app.use('/api', perfilRoutes);
app.use('/api', ejerciciosRoutes);
app.use('/api', rutinasRoutes);
app.use('/api', procesosRoutes);
app.use('/api', notificacionesRoutes);
app.use('/api', rachasRoutes);
app.use('/api', recompensasRoutes);
app.use('/api', motivacionesRoutes);
app.use('/api', comunidadRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
