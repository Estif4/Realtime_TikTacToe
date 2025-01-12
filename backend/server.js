const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: " http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const port = 5000;

app.use(cors());

app.get("/game", (req, res) => {
  res.status(200).send("Tic Tac Toe Game Server");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("playerConnected", (data) => {
    socket.emit("playerConnected", {
      message: "You have connected to the game!",
    });
  });
  socket.on("newPlayerJoined", (data) => {
    socket.broadcast.emit("newPlayerJoined", {
      message: "A new player has joined the game!",
    });
  });

  socket.on("makeMove", (data) => {
    io.emit("moveMade", data);
  });

  socket.on("makeposition", (data) => {
    io.emit("madeposition", data);
  });
  socket.on("makegamefinaldisplay", (data) => {
    io.emit("madegamefinaldisplay", data);
  });

  socket.on("updatePlayerName", (data) => {
    io.emit("playerNameUpdated", data);
  });

  socket.on("gavefinal", (data) => {
    io.emit("makegavefinal", data);
  });

  socket.on("resetGame", (newGame) => {
    io.emit("gameReset", newGame);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
