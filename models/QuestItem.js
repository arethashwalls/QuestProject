// Imports:
const mongoose = require("mongoose");
const {Schema} = mongoose;

const QuestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    children: [{
        type: Schema.Types.ObjectId,
        ref: "QuestItem"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isHead: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('QuestItem', QuestSchema);