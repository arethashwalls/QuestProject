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

const getHeadByUserId = id =>  db.QuestItem.findOne({user: id, isHead: true}).populate('user');
// const recursivePopulate = quest => {
   
    
//     if(quest.children.length === 0) {
//         return quest;
//     } else {
//         quest.children.forEach(child => {
//             console.log(child)
//             child.populate('children')
//             .then(child => recursivePopulate(child))
//         });
//     }
// }

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
        getHeadByUserId(userId)
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
    },
    getFullQuest: (req, res) => {
        const userId = req.params.userid;
        getHeadByUserId(userId)
        .populate({
           path: 'children',
           populate: {
               path: 'children'
           }
        })
        .then(quest => res.json(quest))
        .catch(err => console.log(err));

    }
}