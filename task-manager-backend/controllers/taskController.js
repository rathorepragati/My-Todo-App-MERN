// controllers/taskController.js
const tasks = []; // In-memory task storage

exports.getTasks = (req, res) => {
  res.status(200).json(tasks);
};

exports.createTask = (req, res) => {
  const { title, description, status } = req.body;
  const newTask = { id: tasks.length + 1, title, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.getTask = (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
};

exports.updateTask = (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  const { title, description, status } = req.body;
  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  res.status(200).json(task);
};

exports.deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id == req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};
