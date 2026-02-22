const { Server } = require("socket.io");

let io;

function init(server) {
  io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", socket => {
    console.log("Dashboard Connected");
  });
}

function emit(event, data) {
  if (io) io.emit(event, data);
}

module.exports = { init, emit };