const { Schema, model } = require("mongoose");

// This file specifies how the user looks like and how will it get stored in the database

// I also did validation for each field of the user

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Enter your name"],
    validate: {
      validator: (value) => value.trim().length,
      message: "Enter your name",
    },
    set: (value) => value.trim(),
  },

  phone: {
    type: String,
    required: [true, "Enter your phone number"],
    validate: {
      validator: (value) => value.trim().length,
      message: "Enter your phone number",
    },
    set: (value) => value.trim(),
  },

  email: {
    type: String,
    required: [true, "Please add an email!"],
    validate: {
      validator: function (v) {
        if (!v) return false;
        return EMAIL_REGEX.test(v);
      },
      message: "Please add a valid email!",
    },
    set: (v) => v?.trim(),
  },

  password: {
    type: String,
    validate: {
      validator: (value) => value.length >= 8,
      message: "Password length shall be between 6 and 32!",
    },
    required: [true, "Please add a password!"],
  },

  events: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
  ],
});

module.exports = model("User", userSchema);
