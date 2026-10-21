require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Menu = require("./models/Menu");
const Table = require("./models/Table");

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI .env mein missing hai.");
    }

    if (
      !process.env.ADMIN_NAME ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD
    ) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL aur ADMIN_PASSWORD .env mein required hain.",
      );
    }

    if (process.env.ADMIN_PASSWORD.length < 12) {
      throw new Error(
        "ADMIN_PASSWORD kam az kam 12 characters ka hona chahiye.",
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");

    // Create one customer account with a hashed password.
    const customerEmail = "customer@biteclub.com";
    const customerPassword = "Customer123!";

    await User.findOneAndUpdate(
      { email: customerEmail },
      {
        $set: {
          name: "Bite Club Customer",
          email: customerEmail,
          password: await bcrypt.hash(customerPassword, 12),
          role: "customer",
        },
      },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    // Create or update the manager account using .env credentials.
    await User.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL.trim().toLowerCase() },
      {
        $set: {
          name: process.env.ADMIN_NAME.trim(),
          email: process.env.ADMIN_EMAIL.trim().toLowerCase(),
          password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
          role: "manager",
        },
      },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    // Run the existing menu seed to insert the 50 food items.
    const { spawnSync } = require("child_process");
    const result = spawnSync(
      process.execPath,
      [require.resolve("./seedMenu.js")],
      { stdio: "inherit", env: process.env },
    );

    if (result.status !== 0) {
      throw new Error("Menu seeding failed.");
    }

    // Create six restaurant tables.
    const tables = [
      { tableNumber: 1, seats: 2 },
      { tableNumber: 2, seats: 2 },
      { tableNumber: 3, seats: 4 },
      { tableNumber: 4, seats: 4 },
      { tableNumber: 5, seats: 6 },
      { tableNumber: 6, seats: 6 },
    ];

    for (const table of tables) {
      await Table.findOneAndUpdate(
        { tableNumber: table.tableNumber },
        { $set: { ...table, isAvailable: true } },
        { upsert: true, new: true, runValidators: true },
      );
    }

    console.log("Customer account seeded: customer@biteclub.com");
    console.log("Manager account seeded using ADMIN_EMAIL from .env");
    console.log("Six restaurant tables seeded.");
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Database seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

seedDatabase();
