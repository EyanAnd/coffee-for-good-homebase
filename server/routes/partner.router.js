const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET to grab transaction data associated with partner
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "cfg_data";`;

    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch( err => {
        console.log('got a error GETTING cfg_data', err)
    })
})

// GET TO RETURN AN OBJECT THAT WE CAN SHOW ^^
// Get to partner table to show mission, goals, statistics

// GET to reports to grab any reports to put in a table

// router PUT for reports to indicate if they were read or not



module.exports = router;