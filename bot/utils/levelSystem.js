const fs = require("fs");
const path = require("path");

module.exports = function addXP(userId) {
  const file = path.join(__dirname, "../../data/levels.json");
  const data = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file))
    : {};

  if (!data[userId]) data[userId] = { xp: 0, level: 1 };

  data[userId].xp += 10;

  if (data[userId].xp >= data[userId].level * 100) {
    data[userId].level++;
    data[userId].xp = 0;
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};