const socketIO = require('socket.io');

let io;

exports.init = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "*", // Permite todas origens (em desenvolvimento)
      methods: ["GET", "POST"]
    },
    path: "/socket.io/" // Caminho explícito
  });

  io.on('connection', (socket) => {
    console.log('✅ Cliente conectado:', socket.id);
    
    socket.on('subscribe', (room) => {
      socket.join(room);
      console.log(`📌 Cliente entrou na sala: ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('❌ Cliente desconectado:', socket.id);
    });
  });
};

exports.getIO = () => {
  if (!io) throw new Error("Socket.io não inicializado");
  return io;
};