// Imports:
const express = require('express'),
      router = express.Router(),
      apiController = require('../controllers/apiControllers');

/************************************************************************
 * Routes have the following syntax:
 * router.method('/path/', apiController.methodName)
 * 
 * Our server file prepends /api/ to all API routes, so a router to /path/ 
 * in apiRoutes.js will be served at /api/path/.
 ************************************************************************/

 router.get('/users/:id', apiController.getUser);