import mongoose from "mongoose";
const Schema = mongoose.Schema;

const touristSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    touristPassword: {
      type: String,
    },
    touristPhone: {
      type: String,
      default: "",
    },
    touristImage: {
      type: String,
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
    touristAddress: {
      type: String,
      default: "",
    },

    touristCountry: {
      type: String,
      default: "",
    },
    booked: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booked",
      },
    ],
    blogsAction: [
      {
        blog: { type: Schema.Types.ObjectId, ref: "Blog" },
        likedislike: { type: String },
      },
    ],
    bookedPackages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tourist", touristSchema);
export default Tourist;
