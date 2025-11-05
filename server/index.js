const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Luminaris AI rodando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${PORT}`);
});
