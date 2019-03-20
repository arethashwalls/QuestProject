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
    getUser: (req, res) => {
        const id = req.params.id;
        db.User.findOne({_id: id})
        .then(data => res.json(data))
        .catch(err => console.log(err));
    }
}