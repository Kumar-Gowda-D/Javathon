const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const helpSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Help", helpSchema);
