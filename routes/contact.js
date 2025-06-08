const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Kõik väljad on kohustuslikud." });
    }

    const newMsg = new Message({ name, email, message });
    await newMsg.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("❌ Kontaktivormi viga:", err);
    res.status(500).json({ error: "Serveri viga" });
  }
});

module.exports = router;
