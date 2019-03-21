// Imports:
const db = require('../models');

// Controller functions:
module.exports = {
    getQuestHead: (req, res) => {
        const userId = req.params.userid;
        db.Quest.findOne({user: userId})
        .populate('user')
        .then(data => res.json(data))
        .catch(err => console.log(err));
    },
    createQuest: (req, res) => {
        db.Quest.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err));
    },
}