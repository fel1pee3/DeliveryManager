const socketIO = require('socket.io');

let io;

exports.init = (server) => {
  io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('subscribe', (deliveryPersonId) => {
      socket.join(`delivery_${deliveryPersonId}`);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};

exports.getIO = () => {
  if (!io) throw new Error('Socket.io não inicializado');
  return io;
};