//middlewares/validateTask.js
const validateTask = (req, res, next) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

module.exports = validateTask;
