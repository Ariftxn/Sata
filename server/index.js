require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const passport = require("./auth");

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Passport Initialization (for Discord OAuth)
app.use(passport.initialize());
app.use(passport.session());

// Store io instance globally
global.io = io;

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/config", require("./routes/config"));

// Socket.io Connection Handler
io.on("connection", (socket) => {
  console.log("✅ Dashboard Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Dashboard Disconnected:", socket.id);
  });

  socket.on("executeCommand", async (data) => {
    try {
      const { command, guildId, userId } = data;
      console.log(`📤 Executing command: ${command}`);
      global.io.emit("botCommand", {
        command,
        guildId,
        userId,
        timestamp: new Date(),
      });
      socket.emit("commandStatus", {
        status: "sent",
        message: `Command "${command}" sent to bot`,
      });
    } catch (error) {
      console.error("Command execution error:", error);
      socket.emit("commandError", {
        status: "error",
        message: error.message,
      });
    }
  });

  socket.on("commandLog", (data) => {
    console.log("📥 Command Log:", data);
    io.emit("updateCommandLog", data);
  });

  socket.on("modLog", (data) => {
    console.log("📥 Mod Log:", data);
    io.emit("updateModLog", data);
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

app.use(express.static(path.join(__dirname, "../web")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../web/index.html"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Waiting for bot connection...`);
});

module.exports = server;