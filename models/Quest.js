// Imports:
const mongoose = require("mongoose");
const {Schema} = mongoose;

const QuestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    headItem: {
        type: Schema.Types.ObjectId,
        ref: "QuestItem",
        required: true
    }
});

module.exports = mongoose.model('Quest', QuestSchema);