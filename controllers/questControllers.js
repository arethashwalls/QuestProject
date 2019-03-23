// Imports:
const db = require('../models');

// Helper function for DRYness:
const getHeadByUserId = id =>  db.QuestItem.findOne({user: id, isHead: true}, {}, { autopopulate: false }).populate('user');

// Controller methods:
module.exports = {
    // This method creates the first quest item in a quest:
    createQuestHead: (req, res) => {
        const {title, body} = req.body;
        const userId = req.params.userid;
        db.QuestItem.create({
            title: title,
            body: body,
            children: [],
            user: userId,
            isHead: true
        })
        .then(questHead => res.json(questHead))
        .catch(err => console.log(err));
    },
    // This method creates a quest item as the child of another item:
    createQuestChild: (req, res) => {
        const {title, body} = req.body;
        const userId = req.params.userid;
        db.QuestItem.create({
            title: title,
            body: body,
            children: [],
            user: userId,
            isHead: false
        })
        .then(newQuestItem => {
            db.QuestItem.findOneAndUpdate(
                {_id: req.body.parentid},
                {$push: {children: newQuestItem._id}}
            )
            .then(updatedItem => res.json(newQuestItem))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    // This method gets only the head of a particular quest:
    getQuestHead: (req, res) => {
        const userId = req.params.userid;
        getHeadByUserId(userId)
        .then(QuestItem => res.json(QuestItem))
        .catch(err => console.log(err));
    },
    // This method gets a full quest:
    getFullQuest: (req, res) => {
        const userId = req.params.userid;
        getHeadByUserId(userId)
        .populate('children')
        .then(quest => res.json(quest))
        .catch(err => console.log(err));

    }
}