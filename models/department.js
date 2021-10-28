const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        tower: {
            type: String,
            trim: true,
            required: "Tower is required",
            enum: ["A", "B", "C", "D", "F"],
        },
        number: {
            type: Number,
        },
        mts: {
            type: Number,
        },
        commonExpenses: [
            {
                type: ObjectId,
                ref: 'CommonExpenses',
            }
        ],
        address: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);