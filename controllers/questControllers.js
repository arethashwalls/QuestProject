// Imports:
const db = require('../models');

/*
{
    title: blah,
    children: [
        {
            title:
            chilren: [
                {item}
            ]
        },
        {
            title:
            chilren: [
                {item}
            ]
        }
    ]
}
*/

// Controller functions:
module.exports = {
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
    getQuestHead: (req, res) => {
        const userId = req.params.userid;
        db.QuestItem.findOne({user: userId, isHead: true})
        .populate('user')
        .then(QuestItem => res.json(QuestItem))
        .catch(err => console.log(err));
    },
    

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
    }
}