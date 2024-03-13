import express from "express";
import logger from "morgan";
import { Server } from "socket.io"; // Importar un servidor de web sockets
import { createServer } from "node:http"; // Crear un servidor http de node

const PORT = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration
  }
}); // De aqui es donde vamos a usar el protocolo web sockets

io.on("connection", (socket) => {
  console.log("a user has connection");

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("an user has disconnect");
  });
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(PORT, () => {
  console.log(`Aplicacion ejecutandose en, http://localhost:${PORT}`);
});
