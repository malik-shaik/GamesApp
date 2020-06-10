const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const ConnectionDB = require("./Database/connection");
const gameRoutes = require("./API/routes/gameRoutes");
const userRoutes = require("./API/routes/userRoutes");
const messageRoutes = require("./API/routes/messageRoutes");
const path = require("path");

const app = express();

// Connect Database
ConnectionDB();

// init middleware
app.use(express.json());
app.use(express.static("src/uploads/gameCovers")); // for the images to load in client
app.use(express.static(path.join(__dirname, "client/build")));
app.use(fileUpload());
app.use(cors());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/messages", messageRoutes);

// Default static route
app.get("/*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
);

module.exports = app;
