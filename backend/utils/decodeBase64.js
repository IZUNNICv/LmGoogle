const fs = require("fs");

function decodeBase64ToFile(base64, filePath) {
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync(filePath, buffer);
}

module.exports = { decodeBase64ToFile };
