const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectMongoDB } = require('./config/db');
const routes = require('./routes/deliveryRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Banco de Dados
connectMongoDB();

// Rotas
app.use('/api/delivery', routes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = app;