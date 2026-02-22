const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const client = require("../../bot/index");

router.post("/prefix", (req, res) => {
  const { prefix } = req.body;

  const configPath = path.join(__dirname, "../../data/config.json");
  fs.writeFileSync(configPath, JSON.stringify({ prefix }, null, 2));

  client.prefix = prefix;

  res.json({ success: true });
});

module.exports = router;