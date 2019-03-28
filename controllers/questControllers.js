// Imports:
const db = require('../models');

// Helper function for DRYness:
//const getHeadByUserId = id =>  db.QuestItem.findOne({user: id, isHead: true}, {}, { autopopulate: false }).populate('user');

// Controller methods:
module.exports = {
    //Saving a quest to the database
    saveQuest: (req, res) => {
        db.Quest.create({
            chart: req.body
        })
        .then(dbQuest => res.json(dbQuest))
        .catch(err => res.status(422).json(err))
    },
    
    // This method gets a full quest:
    getQuest: (req, res) => {
        
        db.Quest.find({})
        .then(dbQuest => res.json(dbQuest))
        .catch(err => res.status(422).json(err))
    }
}