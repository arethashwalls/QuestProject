// Imports:
const express = require("express"),
  router = express.Router(),
  { userControllers, questControllers } = require("../controllers");

/************************************************************************
 * Routes have the following syntax:
 * router.method('/path/', apiController.methodName)
 *
 * Our server file prepends /api/ to all API routes, so a router to /path/
 * in apiRoutes.js will be served at /api/path/.
 ************************************************************************/

router.post("/users/login", userControllers.login);

router.route("/users/register").post(userControllers.register);

router.route("/quest/user").post(questControllers.saveQuest);

router.route("/quest/user/:id").get(questControllers.getQuest);

router.route("/quests/:id/:user").put(questControllers.updateQuest);

// Exports:
module.exports = router;
