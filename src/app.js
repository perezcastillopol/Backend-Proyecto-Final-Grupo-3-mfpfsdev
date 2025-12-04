// Creation and configuration of the Express APP
import express from 'express';
import cors from 'cors';

import apiRoutes from './routes/api.routes.js';
import {authenticate} from "./middlewares/auth.middlewares.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api',
    authenticate.unless({
      path: [
        { url: 'api/auth/login', method: ['POST'] }
      ]
    }), apiRoutes);


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
