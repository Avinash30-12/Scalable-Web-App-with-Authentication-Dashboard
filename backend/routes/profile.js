const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/user");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user,            
      req.body,
      { new: true }         
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); 
  } catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
