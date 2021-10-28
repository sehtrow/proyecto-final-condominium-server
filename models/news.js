const mongoose = require("mongoose"), Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Title is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
      text: true,
    },
    mainPicture: {
      type: Array,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    valid: {
      type: Boolean,
      defult: true,
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("News", newsSchema);