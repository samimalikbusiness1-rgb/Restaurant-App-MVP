const express = require("express");
const mongoose = require("mongoose");
const Menu = require("../models/Menu");
const { protect, managerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all available food items (public)
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find({ available: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json(items);
  } catch (error) {
    console.error("Menu error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch menu",
    });
  }
});

// Add a food item (admin only)
router.post("/", protect, managerOnly, async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        message: "Valid name, price and category are required",
      });
    }

    const item = await Menu.create({
      name: name.trim(),
      description: typeof description === "string" ? description.trim() : "",
      price,
      image: typeof image === "string" ? image.trim() : "",
      category: category.trim(),
    });

    return res.status(201).json({
      message: "Food item added successfully",
      item,
    });
  } catch (error) {
    console.error("Add menu error:", error.message);
    return res.status(500).json({
      message: "Failed to add food item",
    });
  }
});

// Edit a food item (admin only)
router.patch("/:id", protect, managerOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid food item ID",
      });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "image",
      "category",
      "available",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide at least one field to update",
      });
    }

    if (
      updates.name !== undefined &&
      (typeof updates.name !== "string" || !updates.name.trim())
    ) {
      return res.status(400).json({ message: "Invalid food name" });
    }

    if (
      updates.category !== undefined &&
      (typeof updates.category !== "string" || !updates.category.trim())
    ) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (
      updates.price !== undefined &&
      (typeof updates.price !== "number" ||
        !Number.isFinite(updates.price) ||
        updates.price < 0)
    ) {
      return res.status(400).json({ message: "Invalid price" });
    }

    if (
      updates.description !== undefined &&
      typeof updates.description !== "string"
    ) {
      return res.status(400).json({ message: "Invalid description" });
    }

    if (updates.image !== undefined && typeof updates.image !== "string") {
      return res.status(400).json({ message: "Invalid image URL" });
    }

    if (
      updates.available !== undefined &&
      typeof updates.available !== "boolean"
    ) {
      return res.status(400).json({ message: "Invalid availability value" });
    }

    if (typeof updates.name === "string") {
      updates.name = updates.name.trim();
    }
    if (typeof updates.category === "string") {
      updates.category = updates.category.trim();
    }
    if (typeof updates.description === "string") {
      updates.description = updates.description.trim();
    }
    if (typeof updates.image === "string") {
      updates.image = updates.image.trim();
    }

    const item = await Menu.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!item) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json({
      message: "Food item updated successfully",
      item,
    });
  } catch (error) {
    console.error("Update menu error:", error.message);
    return res.status(500).json({
      message: "Failed to update food item",
    });
  }
});

// Delete a food item (admin only)
router.delete("/:id", protect, managerOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid food item ID",
      });
    }

    const item = await Menu.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    return res.status(200).json({
      message: "Food item deleted successfully",
      item,
    });
  } catch (error) {
    console.error("Delete menu error:", error.message);
    return res.status(500).json({
      message: "Failed to delete food item",
    });
  }
});

module.exports = router;
