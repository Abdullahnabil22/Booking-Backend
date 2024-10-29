const socketIo = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: ["http://localhost:54200", "http://localhost:4200"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["polling", "websocket"],
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Handle payout requests
    socket.on("payout_request", (data) => {
      console.log("Received payout request:", data);
      io.emit("payout_request", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });

    socket.on("ping", () => {
      socket.emit("pong");
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
