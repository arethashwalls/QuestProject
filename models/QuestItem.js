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
    }]
});

module.exports = mongoose.model('QuestItem', QuestSchema);