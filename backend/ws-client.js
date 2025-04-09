// ws-client.js
const { io } = require("socket.io-client");

const socket = io("ws://localhost:5001", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Conectado ao servidor WebSocket!");

  // Enviar inscrição, substitua pelo ID correto do entregador
  socket.emit("subscribe", "delivery_1");
});

socket.on("locationUpdate", (data) => {
  console.log("📍 Atualização de localização recebida:", data);
});

socket.on("disconnect", () => {
  console.log("❌ Desconectado do servidor WebSocket");
});
