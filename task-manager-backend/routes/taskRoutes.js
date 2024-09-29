// routes/taskRoutes.js
const express = require("express");
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const validateTask = require("../middlewares/validateTask");
const router = express.Router();

router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.get("/:id", getTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
