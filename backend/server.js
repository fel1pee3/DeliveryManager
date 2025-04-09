const app = require('./app');
const http = require('http');
const { init } = require('./services/realtimeService');
const { sequelize } = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

// Sincronizar modelos PostgreSQL
sequelize.sync()
  .then(() => console.log('✅ PostgreSQL sincronizado'))
  .catch(err => console.error('❌ Erro no PostgreSQL:', err));

const server = http.createServer(app);

// Iniciar WebSocket
init(server);

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});