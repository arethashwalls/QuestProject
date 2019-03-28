// Imports:
const mongoose = require("mongoose");
const { Schema } = mongoose;

const questSchema = new Schema({

    chart: {
        type: String,
        get: function (data) {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        },
        set: function (data) {
            return JSON.stringify(data);
        }
    }
});

const Quest = mongoose.model("QuestItem", questSchema);

module.exports = Quest;