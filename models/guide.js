import mongoose from "mongoose";
const Schema = mongoose.Schema;

const guideSchema = new Schema(
  {
    name: {
      type: String,
    },
    guideEmail: {
      type: String,
    },
    guidePassword: {
      type: String,
    },
    guideAccepted: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "",
    },
    guideImage: {
      type: String,
    },
    guideAddress: {
      type: String,
      default: "",
    },

    guideCountry: {
      type: String,
      default: "",
    },

    profileComplete: {
      type: Boolean,
      default: false,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guide", guideSchema);
export default Guide;
