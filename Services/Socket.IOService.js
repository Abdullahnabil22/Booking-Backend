const socketIo = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: [
        "http://localhost:4300",
        "http://localhost:4200",
        "http://localhost:3001",
        "https://booking-mearn-front.vercel.app",
        "https://bookingadminpanel.netlify.app",
        "https://bookingpartnerpanel.netlify.app",
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

    socket.on("new_message", (message) => {
      console.log("New message received:", message);

      socket.broadcast.emit("new_message", message);
    });

    socket.on("message_read", (messageId) => {
      console.log("Message marked as read:", messageId);
      socket.broadcast.emit("message_read", messageId);
    });

    socket.on("payout_status_update", (data) => {
      console.log("Payout status update:", data);
      io.emit("payout_status_update", data);
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
