const Task = require("../models/Task");
const emitToBoard = require("../utils/socket").emitToBoard;

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignee } =
      req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: { error: "Title is required" } });
    }
    if (!assignee) {
      return res.status(400).json({ error: { error: "Assignee is required" } });
    }
    const task = new Task({
      title: title.trim(),
      description: description || "",
      status: status || "todo",
      priority: priority || "medium",
      dueDate: dueDate || undefined,
      assignee: assignee || null,
      createdBy: req.user.id,
    });
    await task.save();
    // Emit real-time update to clients in the 'board' room
    await task.populate([
      { path: "assignee", select: "name email" },
      { path: "createdBy", select: "name email" },
    ]);
    emitToBoard(req.app.get("io"), "taskCreated", task);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: { error: error.message } });
  }
};

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      assignee,
      search,
      dueBefore,
      dueAfter,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    // Role-based scope
    if (req.user.role !== "admin") {
      filter.$or = [{ assignee: req.user.id }, { createdBy: req.user.id }];
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters
      const regex = new RegExp(escapedSearch, "i");
      const searchCond = { $or: [{ title: regex }, { description: regex }] };
      // Merge with existing $or if present
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, searchCond];
        delete filter.$or;
      } else {
        Object.assign(filter, searchCond);
      }
    }

    if (dueBefore || dueAfter) {
      filter.dueDate = {};
      if (dueBefore) filter.dueDate.$lte = new Date(dueBefore);
      if (dueAfter) filter.dueDate.$gte = new Date(dueAfter);
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate("assignee", "name email")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Task.countDocuments(filter),
    ]);

    return res.status(200).json({
      tasks,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ error: { error: error.message } });
  }
};

// @desc    Update a single task by ID
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Authorization
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id &&
      task.assignee?.toString() !== req.user.id
    ) {
      return res.status(403).json({ error: { error: "Access denied" } });
    }

    const { title, description, status, priority, dueDate, assignee } =
      req.body;
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (assignee !== undefined) task.assignee = assignee;

    await task.save();
    // Emit real-time update to clients in the 'board' room
    await task.populate([
      { path: "assignee", select: "name email" },
      { path: "createdBy", select: "name email" },
    ]);
    emitToBoard(req.app.get("io"), "taskUpdated", task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: { error: error.message } });
  }
};

// @desc    Delete a single task by ID
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Authorization
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id &&
      task.assignee?.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }
    await task.deleteOne();
    // Emit real-time update to clients in the 'board' room
    await task.populate([
      { path: "assignee", select: "name email" },
      { path: "createdBy", select: "name email" },
    ]);
    emitToBoard(req.app.get("io"), "taskDeleted", task);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: { error: error.message } });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
