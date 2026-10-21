const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    tableNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  { timestamps: true },
);

// Ek table same date aur time par dobara book nahi ho sakta.
reservationSchema.index({ date: 1, time: 1, tableNumber: 1 }, { unique: true });

module.exports = mongoose.model("Reservation", reservationSchema);
