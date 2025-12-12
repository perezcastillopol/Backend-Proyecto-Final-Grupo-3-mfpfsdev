// Creation and configuration of the Express APP
import express from 'express';
import cors from 'cors';
import { enviarAvisoCambioViaje } from './services/emailService.js';


const app = express();
app.use(express.json());

// Ruta de prueba para emails
app.get('/test-email', async (req, res) => {
  try {
    await enviarAvisoCambioViaje(
      [process.env.EMAIL_USER],              
      'Prueba de email desde TripBud',      
      'Este es un correo de prueba - test test :)'      
    );

    res.json({ message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ error: 'Error enviando email' });
  }
});


// Route configuration
// Example:
app.use(cors());
import apiRoutes from './routes/api.routes.js';
app.use('/api', apiRoutes);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
