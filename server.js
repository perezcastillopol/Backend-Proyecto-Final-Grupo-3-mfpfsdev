const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API TripBud funcionando');
});

// Login básico (por ahora de prueba)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validación temporal (hasta conectar BBDD)
  if (email === 'test@test.com' && password === '123456') {
    return res.json({
      token: 'TOKEN_FALSO_123'
    });
  }

  return res.status(401).json({ message: 'Credenciales incorrectas' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});