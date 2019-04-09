// Imports:
const db = require('../models');

// Controller methods:
module.exports = {
  //Saving a quest to the database
  saveQuest: (req, res) => {
    db.Quest.create({
      chart: req.body.quest,
      user: req.body.userId,
      title: req.body.title
    })
      .then(dbQuest => res.json(dbQuest))
      .catch(err => res.status(422).json(err));
  },

  // This method gets a full quest
  getQuest: (req, res) => {
    db.Quest.find({
      user: req.params.id
    })
      .then(dbQuest => res.json(dbQuest))
      .catch(err => res.status(422).json(err));
  },

  updateQuest: (req, res) => {
    db.Quest.findByIdAndUpdate(
      { _id: req.params.id },
      { chart: req.body },
      { new: true }
    )
      .then(dbQuest => res.json(dbQuest))
      .catch(err => res.status(422).json(err));
  },

  getAllQuests: (req, res) =>{
    db.Quest.find({
        user: req.params.user     
    })
    .then(dbQuests => res.json(dbQuests))
    .catch(err => res.status(422).json(err));
  },

  deleteQuest: (req, res) => {
    console.log(req.params.id);
    db.Quest.findByIdAndDelete(
      {
        _id: req.params.id
      }
    )
    .then(dbQuest => res.json(dbQuest))
    .catch(err => res.status(422).json(err))
  }
};
