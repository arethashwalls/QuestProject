// Imports:
const express = require('express'),
      router = express.Router(),
      { userControllers, questControllers } = require('../controllers');

/************************************************************************
 * Routes have the following syntax:
 * router.method('/path/', apiController.methodName)
 * 
 * Our server file prepends /api/ to all API routes, so a router to /path/ 
 * in apiRoutes.js will be served at /api/path/.
 ************************************************************************/

//  router.get('users', apiController.getAllUsers);
router.route('/users')
      .get(userControllers.getAllUsers)
      .post(userControllers.createUser)

router.route('/quests/:userid/head')
      .get(questControllers.getQuestHead)
      .post(questControllers.createQuestHead)

router.route('/quests/:userid/child')
      .post(questControllers.createQuestChild)

router.route('/quests/:userid/full')
      .get(questControllers.getFullQuest)


 // Exports:
 module.exports = router;