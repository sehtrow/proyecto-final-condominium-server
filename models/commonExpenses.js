const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const commoneSchema = new mongoose.Schema(
    {
        state: {
            type: Boolean,
        },
        total: {
            type: Number,
            required: "Total of Common Expenses is required",
        },
        paidBy: {
            type: ObjectId,
            ref: "User",
        },
        paymentDate: {
            type: Date,
        },
        docs: [{
            type: Buffer,
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("CommonExpenses", commoneSchema);