const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const { protect, managerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

const allowedStatuses = [
  "Pending",
  "Preparing",
  "Ready",
  "Served",
  "Cancelled",
];

// Place a new order (logged-in customer)
router.post("/", protect, async (req, res) => {
  try {
    const { customerName, phone, address, items, paymentMethod } = req.body;

    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      typeof address !== "string" ||
      !address.trim() ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Customer details and order items are required",
      });
    }

    if (
      paymentMethod &&
      !["COD", "Card", "Easypaisa", "JazzCash"].includes(paymentMethod)
    ) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    // Validate item IDs and quantities
    for (const item of items) {
      const menuItemId = item.menuItem || item.menuItemId || item._id;

      if (
        !menuItemId ||
        !mongoose.isValidObjectId(menuItemId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Each item must have a valid menu item ID and quantity",
        });
      }
    }

    // Fetch real prices and availability from database
    const menuItemIds = items.map(
      (item) => item.menuItem || item.menuItemId || item._id,
    );

    const uniqueIds = [...new Set(menuItemIds.map(String))];
    const menuItems = await Menu.find({
      _id: { $in: uniqueIds },
    });

    const menuMap = new Map(
      menuItems.map((item) => [item._id.toString(), item]),
    );

    const orderItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const id = String(item.menuItem || item.menuItemId || item._id);
      const menuItem = menuMap.get(id);

      if (!menuItem) {
        return res.status(400).json({
          message: "A selected food item does not exist",
          itemId: id,
        });
      }

      if (!menuItem.available) {
        return res.status(400).json({
          message: `${menuItem.name} is currently unavailable`,
        });
      }

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });

      calculatedTotal += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: orderItems,
      total: calculatedTotal,
      paymentMethod: paymentMethod || "COD",
      status: "Pending",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error.message);
    return res.status(500).json({
      message: "Failed to place order",
    });
  }
});

// Get logged-in customer's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch my orders error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch your orders",
    });
  }
});

// Get all orders (manager only)
router.get("/", protect, managerOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// Update order status (manager only)

/* Cancel order (only its owner, while Pending) */
router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error.message);
    return res.status(500).json({
      message: "Failed to cancel order",
    });
  }
});

router.patch("/:id/status", protect, managerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        allowedStatuses,
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Only Pending orders can be cancelled
    if (status === "Cancelled") {
      if (order.status !== "Pending") {
        return res.status(400).json({
          message: "Only pending orders can be cancelled",
        });
      }
    } else {
      // Status can only move forward
      const progression = ["Pending", "Preparing", "Ready", "Served"];
      const currentIndex = progression.indexOf(order.status);
      const nextIndex = progression.indexOf(status);

      if (nextIndex !== currentIndex + 1) {
        return res.status(400).json({
          message: "Order status must advance one step at a time",
          allowedNextStatus:
            currentIndex >= 0 && currentIndex < progression.length - 1
              ? progression[currentIndex + 1]
              : null,
        });
      }
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error.message);
    return res.status(500).json({
      message: "Failed to update order status",
    });
  }
});

module.exports = router;
