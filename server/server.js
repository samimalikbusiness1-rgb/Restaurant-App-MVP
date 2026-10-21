const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const reservationRoutes = require("./routes/reservation");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timezone: "Asia/Karachi",
    time: new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  });
});

// Unknown route handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message:
      err.status && err.status < 500 ? err.message : "Internal server error",
  });
});

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
