const express = require("express");
const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");
const TableStatus = require("../models/TableStatus");
const router = express.Router();

// Check available tables for a selected date and time
router.get("/availability", async (req, res) => {
  try {
    const { date, time, guests } = req.query;

    if (!date || !time || !guests) {
      return res.status(400).json({
        message: "Date, time and guests are required.",
      });
    }

    const guestCount = Number(guests);

    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
      return res.status(400).json({
        message: "Guests must be between 1 and 20.",
      });
    }

    const tables = [
      { tableNumber: 1, seats: 2 },
      { tableNumber: 2, seats: 2 },
      { tableNumber: 3, seats: 4 },
      { tableNumber: 4, seats: 4 },
      { tableNumber: 5, seats: 6 },
      { tableNumber: 6, seats: 6 },
    ];

    const bookings = await Reservation.find({
      date,
      time,
      status: "Confirmed",
    }).select("tableNumber");

    const bookedTables = bookings.map((booking) => booking.tableNumber);

    const savedStatuses = await TableStatus.find().select(
      "tableNumber isAvailable",
    );

    const statusMap = new Map(
      savedStatuses.map((item) => [item.tableNumber, item.isAvailable]),
    );

    const tableAvailability = tables.map((table) => ({
      ...table,
      isBooked: bookedTables.includes(table.tableNumber),
      isManagerAvailable: statusMap.get(table.tableNumber) !== false,
      suitableForGuests: table.seats >= guestCount,
    }));

    const availableTables = tableAvailability.filter(
      (table) =>
        !table.isBooked && table.isManagerAvailable && table.suitableForGuests,
    );

    return res.json({
      date,
      time,
      availableCount: availableTables.length,
      availableTables,
      tables: tableAvailability,
    });
  } catch (error) {
    console.error("Reservation availability error:", error);
    return res.status(500).json({
      message: "Could not check table availability.",
    });
  }
});

// Create a reservation
router.post("/", async (req, res) => {
  try {
    const { customerName, date, time, guests, tableNumber } = req.body;

    if (
      !customerName?.trim() ||
      !date ||
      !time ||
      guests === undefined ||
      tableNumber === undefined
    ) {
      return res.status(400).json({
        message: "Customer name, date, time, guests and table are required.",
      });
    }

    const guestCount = Number(guests);
    const selectedTable = Number(tableNumber);

    const tables = [
      { tableNumber: 1, seats: 2 },
      { tableNumber: 2, seats: 2 },
      { tableNumber: 3, seats: 4 },
      { tableNumber: 4, seats: 4 },
      { tableNumber: 5, seats: 6 },
      { tableNumber: 6, seats: 6 },
    ];

    const table = tables.find((item) => item.tableNumber === selectedTable);

    const tableStatus = await TableStatus.findOne({
      tableNumber: selectedTable,
    });

    if (tableStatus && !tableStatus.isAvailable) {
      return res.status(409).json({
        message: "This table is currently unavailable.",
      });
    }

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 20 ||
      !table ||
      guestCount > table.seats
    ) {
      return res.status(400).json({
        message: "Invalid guest count or table selection.",
      });
    }

    const reservation = await Reservation.create({
      customerName: customerName.trim(),
      date,
      time,
      guests: guestCount,
      tableNumber: selectedTable,
    });

    return res.status(201).json({
      message: "Reservation created successfully.",
      reservation,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This table is already booked for that date and time.",
      });
    }

    console.error("Create reservation error:", error);
    return res.status(500).json({
      message: "Could not create reservation.",
    });
  }
});

// Cancel a reservation

const tableSeats = {
  1: 2,
  2: 2,
  3: 4,
  4: 4,
  5: 6,
  6: 6,
};

// Get all table statuses
router.get("/tables/status", async (req, res) => {
  try {
    const savedStatuses = await TableStatus.find();
    const statusMap = new Map(
      savedStatuses.map((item) => [item.tableNumber, item.isAvailable]),
    );

    const tables = Object.entries(tableSeats).map(([number, seats]) => ({
      tableNumber: Number(number),
      seats,
      isAvailable: statusMap.get(Number(number)) !== false,
    }));

    return res.json(tables);
  } catch (error) {
    console.error("Fetch table statuses error:", error);
    return res.status(500).json({
      message: "Could not fetch table statuses.",
    });
  }
});

// Update a table's availability
router.patch("/tables/:tableNumber/status", async (req, res) => {
  try {
    const tableNumber = Number(req.params.tableNumber);
    const { isAvailable } = req.body;

    if (!tableSeats[tableNumber] || typeof isAvailable !== "boolean") {
      return res.status(400).json({
        message: "Valid table number and availability are required.",
      });
    }

    const tableStatus = await TableStatus.findOneAndUpdate(
      { tableNumber },
      { $set: { isAvailable } },
      { new: true, upsert: true, runValidators: true },
    );

    return res.json({
      message: `Table ${tableNumber} is now ${
        isAvailable ? "Available" : "Unavailable"
      }.`,
      tableStatus,
    });
  } catch (error) {
    console.error("Update table status error:", error);
    return res.status(500).json({
      message: "Could not update table status.",
    });
  }
});

router.post("/cancel", async (req, res) => {
  try {
    const { customerName, date, time, tableNumber } = req.body;

    if (!customerName || !date || !time || tableNumber === undefined) {
      return res.status(400).json({
        message: "Customer name, date, time and table are required.",
      });
    }

    const result = await Reservation.deleteOne({
      customerName: customerName.trim(),
      date,
      time,
      tableNumber: Number(tableNumber),
      status: "Confirmed",
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    return res.json({
      message: "Reservation cancelled successfully.",
    });
  } catch (error) {
    console.error("Cancel reservation error:", error);
    return res.status(500).json({
      message: "Could not cancel reservation.",
    });
  }
});

// Get all reservations (for the manager dashboard)
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    return res.json(reservations);
  } catch (error) {
    console.error("Fetch reservations error:", error);
    return res.status(500).json({
      message: "Could not fetch reservations.",
    });
  }
});

module.exports = router;
