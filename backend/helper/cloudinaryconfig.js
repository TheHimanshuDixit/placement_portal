const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnkbrc7xq",
  api_key: "945987648327671",
  api_secret: "zL5ZuIISmmD4VuxprA-o79iue-M", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
