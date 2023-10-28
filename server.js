const express = require("express");
const { connectDatabase, db } = require("./config/connection"); // Import the updated connection functions
const routes = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
};

// Connect to the database and start the server when the connection is open
connectDatabase().then(() => {
  startServer();
});
