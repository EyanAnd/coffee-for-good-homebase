const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// put to update user has started application
router.put('/application_started', rejectUnauthenticated, async (req, res) => {
    try {
      // grab user id
      const id = req.user.id

      // text to send to the database
      const queryText = `UPDATE "user" SET "app_started"=true WHERE "id"=$1;`;

      // send it of
      const response = await pool.query(queryText, [id])
      res.sendStatus(200)
      console.log(response)
    } catch (error) {
      console.log('there was an error updating the application start PUT')
      res.sendStatus(500)
    }
})

// put to update user has submitted application
router.put('/application_submitted', rejectUnauthenticated, async (req, res) => {
  try {
    // grab user id
    const id = req.user.id

    // text to send to the database
    const queryText = `UPDATE "user" SET "app_submitted"=true WHERE "id"=$1;`;
    // send it of
    const response = await pool.query(queryText, [id])
    res.sendStatus(200)
    console.log(response)
  } catch (error) {
    console.log('there was an error updating the application submitt PUT')
    res.sendStatus(500)
  }
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
