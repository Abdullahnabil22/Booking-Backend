const socketIo = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      // Update origins to include your Next.js client
      origin: [
        "http://localhost:54200",
        "http://localhost:4200",
        "http://localhost:3001",
      ],
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

    // Handle new messages
    socket.on("new_message", (message) => {
      console.log("New message received:", message);
      // Broadcast the message to all connected clients except sender
      socket.broadcast.emit("new_message", message);
    });

    // Handle message read status
    socket.on("message_read", (messageId) => {
      console.log("Message marked as read:", messageId);
      socket.broadcast.emit("message_read", messageId);
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
