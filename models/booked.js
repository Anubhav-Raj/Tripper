const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookedSchema = new Schema(
  {
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    tourist: {
      type: Schema.Types.ObjectId,
      ref: "Tourist",
    },

    passengerDetails: [
      {
        name: {
          type: String,
        },
        age: {
          type: Number,
        },
      },
    ],
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booked", bookedSchema);
