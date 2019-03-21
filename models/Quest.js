// Imports:
const mongoose = require("mongoose");
const {Schema} = mongoose;

const QuestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: "QuestItem"
    }]
});

module.exports = mongoose.model('Quest', QuestSchema);