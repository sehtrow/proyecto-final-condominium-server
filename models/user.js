const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        role: {
            type: String,
            default: "user",
        },
        property: [{
            type: ObjectId,
            ref: "Department"
        }],
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);