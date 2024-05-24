const mongoose = require("mongoose");
const { Schema } = mongoose;

const Schedule = mongoose.model(
  "Schedule",
  new Schema(
    {
      responsible: {
        type: String,
        require: true,
      },
      pet: Object,
      visitor: Object,
      confirmed: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = Schedule;
