const multer = require("multer");

// Set up multer storage and file upload settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for storing the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create multer instance with the specified storage settings
const upload = multer({ storage: storage });

module.exports = upload;
