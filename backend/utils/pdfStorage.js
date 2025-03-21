const multer = require("multer");

// Multer configuration for storing PDFs
const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "./uploads"),
  filename: (req, file, callback) => callback(null, file.originalname),
});

const upload = multer({ storage });

module.exports = upload;
