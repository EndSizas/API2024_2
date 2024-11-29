import express from 'express';
import cors from 'cors'; // Importa el paquete CORS
import usuariosRoutes from './routes/usuarios.routes.js';
import rutinasRoutes from './routes/rutinas.routes.js';
import ejerciciosRoutes from './routes/ejercicios.routes.js';
import perfilRoutes from './routes/perfil.routes.js'; // Cambié "logros" por "perfil"
import bodyParser from 'body-parser';
import comunidadRoutes from './routes/comunidad.routes.js';
import motivacionesRoutes from './routes/motivaciones.routes.js';
import notificacionesRoutes from './routes/notificaciones.routes.js';
import rachaRoutes from './routes/racha.routes.js';
import recompensasRoutes from './routes/recompensas.routes.js';
import procesosRoutes from './routes/procesos.routes.js';  // Ruta de procesos

const app = express();

// Habilitar CORS con configuración por defecto (acepta solicitudes desde cualquier origen)
app.use(cors()); 

// O si deseas configurar CORS para un dominio específico:
// app.use(cors({
//   origin: 'http://tudominio.com' // Cambia esto por el dominio de tu frontend
// }));

app.use(bodyParser.json());
app.use('/api', usuariosRoutes);
app.use('/api', rutinasRoutes);
app.use('/api', ejerciciosRoutes); // Agregado
app.use('/api', perfilRoutes); // Cambié "logros" por "perfil"
app.use('/api', comunidadRoutes);
app.use('/api', motivacionesRoutes);
app.use('/api', notificacionesRoutes);
app.use('/api', rachaRoutes);
app.use('/api', recompensasRoutes);
app.use('/api', procesosRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

