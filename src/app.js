// Creation and configuration of the Express APP
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());


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
