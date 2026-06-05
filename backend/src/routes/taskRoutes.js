const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
//C(RUD) - Create
router.post("/", protect, createTask);

//@route   GET /api/tasks
//@desc    Get all tasks for the authenticated user
//@access  Private
//R(UD) - Read
router.get("/", protect, getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a single task by ID
// @access  Private
// U(PD) - Update
router.put("/:id", protect, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a single task by ID
// @access  Private
// D(ELETE) - Delete
router.delete("/:id", protect, deleteTask);

module.exports = router;
