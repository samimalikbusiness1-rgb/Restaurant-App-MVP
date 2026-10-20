const mongoose = require("mongoose");

const tableStatusSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      unique: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("TableStatus", tableStatusSchema);
