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

// GET TO RETURN AN OBJECT THAT WE CAN SHOW ^^ ASK MASON
// Get to partner table to show mission, goals, statistics
router.get('/:id', (req, res) => {
    const id = req.params.id
    const queryText = `SELECT "mission", "impact", "values", "collab", "reporting", "notes" FROM "partners" WHERE "partner_id"=$1`

    pool.query(queryText, [id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('got an error GETTING the values from the partner table', err)
        res.sendStatus(500)
    }).catch(err => {
        console.log('there was an error GETTING the reports', err)
    })
})
// GET to reports to grab any reports to put in a table
router.get('/reports/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `SELECT * FROM "reports" WHERE "partner_id"=$1;`;

    pool.query(queryText, [id]).then(result => {
        res.send(result.rows);
    })
})
// router PUT for reports to indicate if they were read or not



module.exports = router;