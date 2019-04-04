// Imports:
const db = require('../models');

// Controller methods:
module.exports = {
  //Saving a quest to the database
  saveQuest: (req, res) => {
    db.Quest.create({
      chart: req.body.quest,
      user: req.body.userId
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
    console.log(req.body);
    db.Quest.findByIdAndUpdate(
      { _id: req.params.id },
      { chart: req.body },
      { new: true }
    )
      .then(dbQuest => res.json(dbQuest))
      .catch(err => res.status(422).json(err));
  }
};
