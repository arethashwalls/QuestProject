// Imports:
const db = require('../models');

// Controller functions:
module.exports = {
/************************************************************************
 * Controllers have the following syntax:
 * functionName: (req, res) => {
 *    const data = doStuff();
 *    res.json(data)  
 * }
 * 
 * Each controller is exported as a property of the module.exports object.
 ************************************************************************/
    getAllUsers: (req, res) => {
        db.User.find({})
        .then(data => res.json(data))
        .catch(err => console.log(err));
    },
    createUser: (req, res) => {
        db.User.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    },
    // getClass: (req, res) => {
    //     db.User.find({})
    // }
}