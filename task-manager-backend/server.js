const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const cors = require("cors");

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Task routes
app.use("/api/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
