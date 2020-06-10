const { port } = require("./src/config");
const server = require("./app");

const PORT = port || 5000;

server.listen(PORT, (err) => {
  if (err) {
    console.log(`⛔️ Server cannot start. Error:${err.message} ⛔️`);
    return;
  }
  console.log(`
  🚀🚀🚀 SERVER RUNNING ON PORT: ${PORT} 🚀🚀🚀`);
});
