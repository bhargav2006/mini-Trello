const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/userController");

// Example protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    user: req.user, // this comes from the middleware
    message: "You are authorized",
  });
});

// Admin-only route to get all users
router.get("/", protect, getAllUsers);

// Admin-only route to delete a user
router.delete("/:id", protect, deleteUser);

module.exports = router;
