const mongoose = require("mongoose");
const { Schema } = mongoose;

const Schedule = mongoose.model(
  "Schedule",
  new Schema(
    {
      pet: Object,
      visitor: Object,
      concluded: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = Schedule;
