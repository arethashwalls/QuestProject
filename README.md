# [A Quest!](https://bootcamp-quest-app.herokuapp.com/)
## **A Quest** is a productivity and planning app with a classic RPG theme that allows users to create flowcharts representing "quests".
### Anne Chen, Carmina Garcia, CJ Vaughn, and Aretha SH Walls.

*A Quest!* allows users to create accounts, make flowchart-esque quests, and associate quests with their account. Users can edit their quests. Users can also set a color theme by selecting a "character class".

*A Quest!* uses:

**Back End**
* The [Node.js](https://nodejs.org/en/) runtime environment.
* The [Express](https://expressjs.com/) web framework.
* A [Mongo](https://www.mongodb.com/) database.
* The [Mongoose](https://mongoosejs.com/) ORM.
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) to hash user passwords.
* [Dotenv](https://github.com/motdotla/dotenv#readme) to store secrets.
* [Passport](http://www.passportjs.org/) to create authentification strategies, along with the [Passport-JWT](https://github.com/mikenicholson/passport-jwt) middleware.
* [JSONWebToken](https://github.com/auth0/node-jsonwebtoken) for parsing JWTs.
* [Validator](https://github.com/chriso/validator.js) for validation.
* [if-env](https://github.com/ericclemmons/if-env#readme) for Yarn scripting.
* The [Yarn](https://yarnpkg.com/en/) package management tool.

**Front End**
* [React](rhttps://reactjs.org/) as a front-end framework and the [React-DOM](https://www.npmjs.com/package/react-dom), [React-Router-DOM](https://www.npmjs.com/package/react-router-dom), [React-Scripts](https://github.com/facebook/create-react-app#readme) middleware.
* [Axios](https://github.com/axios/axios) for API calls.
* The [Bootstrap](https://getbootstrap.com/) CSS framework and its React library [React-Bootstrap](https://react-bootstrap.github.io/).
* The [JointJS](https://www.jointjs.com/) flowchart library.
* [Redux](https://redux.js.org/) for state management and the [Redux-Devtools-Extension](https://github.com/zalmoxisus/redux-devtools-extension) and [Redux-Thunk](https://github.com/reduxjs/redux-thunk) packages.

### Contents:
  
* `client` contains the React application.
  * `public` serves public files.
  * `src`
    * `actions`
      * [`actions.js`](/client/src/actions/actions.js) holds necessary authentification functions.
      * [`types.js`](/client/src/actions/types.js) sets Redux types as strings.
    * `components` holds all React components.
      * [auth](/client/src/components/auth) holds forms for singing in and signing up.
    * [`pages`](/client/src/components/pages) holds all full pages.
    * [`utils`](/client/src/components/utils) holds a few utility functions.
    * [`store.js`](/client/src/components/store.js) holds the Redux store.
* `controllers`
  * [`questController.js`](/controllers/questController.js) and [`userController.js`](/controllers/userController.js) contain controller functions for Quests and Users.
* `models` contains Mongoose models [Quest](/models/Quest.js) and [User](/models/User.js).
* `routes` contains the [API Router](/routes/apiRoutes).
* `validation` contains authentification functions for [Login](/validation/login.js) and [Registration](/validation/register.js).
* A `.eslintrc` file.
* A `.gitignore` file
* Yarn's `yarn.lock` and `package.json` files.
* This `readme`.
* A [`server.js`](/server.js) file for setting up the Express server.

### Models:

A Quests's database has the following collections:

**Quest**
* *chart*: A JSON representation of the user's flowchart quest. 
* *user*: A reference to the Quest's user.

**User**
* *name*: The user's name.
* *class*: The user's character class, which determines their theme.
* *email*: The user's email address.
* *password*: The user's hashed password.
* *date*: The date that the user made their account.

### Front End:

*A Quest!*'s front end is built in React. The front-end router dislays four pages:
* `/welcome` is a splash screen directing new users to sign up or sign in.
* `/signup` allows users to create accounts.
* `/signin` allows users with accounts to sign back in.
* The root route (`/`) displays users' quests.

*A Quest!*'s authentification will automatically redirect users who attempt to access the root without the correct authentification to the welcome page.

### API:

*A Quest!* has the following API routes:
* POST `api/users/login` sends login data to the server.
* POST `api/users/register` sends registration data to the server.
* POST `api/quest/user` creates a new quest.
* GET `api/quest/user/:id` gets a user's quests.
* PUT `api/quests/:id/:user` updates a specific quest.
