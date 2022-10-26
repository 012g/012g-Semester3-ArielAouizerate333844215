const { Schema, model } = require("mongoose");
const axios = require("axios");

// This file specifies how the event looks like and how will it get stored in the database

// I also did validation for each field of the event
const eventSchema = new Schema({
  teamName: {
    type: String,
    required: [true, "Enter team name"],
    validate: {
      validator: (value) => value.trim().length,
      message: "Enter team name",
    },
    set: (value) => value.trim(),
  },

  slots: {
    type: Number,
    required: [true, "Enter slots"],
    validate: {
      validator: (value) => value > 0,
      message: "Slot shall be greater than 0",
    },
  },

  category: {
    type: String,
    required: [true, "Enter category"],
    validate: {
      validator: (value) => value.trim().length,
      message: "Enter category",
    },
    set: (value) => value.trim(),
  },

  address: {
    type: String,
    required: [true, "Enter address"],
    validate: {
      validator: (value) => value.trim().length,
      message: "Enter address",
    },
    set: (value) => value.trim(),
  },

  date: {
    type: Date,
    required: [true, "Enter date"],
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});

// Before creating an event we are converting the address to the coordinates
eventSchema.pre("save", async function (next) {
  const res = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      this.address
    )}&key=ef1db87a7c70417ca26087e3c2ed1e81&no_annotations=1&limit=1`
  );

  const { lat, lng } = res.data?.results[0]?.geometry;
  this.location = {
    type: "Point",
    coordinates: [lng, lat],
  };

  next();
});

module.exports = model("Event", eventSchema);
