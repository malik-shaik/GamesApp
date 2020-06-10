const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const ConnectDB = require("./src/Database/connection");
const gameRoutes = require("./src/API/routes/gameRoutes");
const messageRoutes = require("./src/API/routes/messageRoutes");
const userRoutes = require("./src/API/routes/userRoutes");

const app = express();

// Connect Database
ConnectDB();

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
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

module.exports = app;
