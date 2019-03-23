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
        ref: "QuestItem",
        autopopulate: true
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
QuestSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('QuestItem', QuestSchema);