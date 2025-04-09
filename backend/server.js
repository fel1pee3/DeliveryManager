const app = require('./app');
const http = require('http');
const socketIO = require('socket.io'); // Importação direta
const { sequelize } = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

// 1. Configuração do Servidor
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*", // Permite qualquer origem (apenas para desenvolvimento)
  },
  path: "/socket.io/",
  allowEIO3: true, // Compatibilidade com clientes antigos
  transports: ["websocket"], // Força usar apenas WebSocket
  pingTimeout: 60000,
  pingInterval: 25000,
  cookie: false
});

// 3. Eventos do WebSocket
io.on('connection', (socket) => {
  console.log('✅ Cliente conectado:', socket.id);

  socket.on('subscribe', (room) => {
    socket.join(room);
    console.log(`📌 Cliente ${socket.id} entrou na sala: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

// 4. Sincronização do Banco de Dados
sequelize.sync()
  .then(() => console.log('✅ PostgreSQL sincronizado'))
  .catch(err => console.error('❌ Erro no PostgreSQL:', err));

// 5. Tratamento de Erros
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} ocupada. Tente:`);
    console.log(`1. Executar: npx kill-port ${PORT}`);
    console.log('2. Mudar a porta no arquivo .env');
  } else {
    console.error('❌ Erro no servidor:', error);
  }
});

// 6. Inicialização
server.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP rodando na porta ${PORT}`);
  console.log(`🔗 WebSocket disponível em: ws://localhost:${PORT}/socket.io/`);
});

// Exporte o io para uso em outros arquivos
module.exports = { io };