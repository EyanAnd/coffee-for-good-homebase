const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET to grab applications
router.get('/applications', (req, res) => {
    const queryText = `SELECT * FROM "application";`;

    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('error GETTING ALL the applications', err)
    })
})
// PUT to update application approval
router.put('/:user_id', async (req, res) => {
    try {
        const id = req.params.user_id
        const queryText = `UPDATE "application" SET "approved"=true WHERE "user_id"=$1;`;
        await pool.query(queryText, [id])
        res.sendStatus(200);
    } catch (error) {
        console.log('there was an error UPDATING approval', error)
    }
})
// GET to grab reports
router.get('/reports', async (req, res) => {
    try {
        const queryText = `SELECT * FROM "reports";`;
        const response = await pool.query(queryText)
        res.send(response.rows)
    } catch (error) {
        console.log('there was an error GETTING reports', error)
    }
})
// get to post a report
router.post('/reports', async (req, res) => {
    try {
        const queryText = `INSERT INTO "reports" ("partner_id", "name", "description", "date_sent", "category") VALUES ($1, $2, $3, $4, $5);`;

        await pool.query(queryText, [req.body.partner_id, req.body.name, req.body.description, req.body.date_sent, req.body.category])
        res.sendStatus(201);

    } catch (error) {
        console.log('there was an error POSTING a report', error)
    }
})

// DELETE to delete an application
router.delete('/applications/:user_id', async (req, res) => {
    try {
        const id = req.params.user_id
        const queryText = `DELETE FROM "application" WHERE "user_id"=$1;`;
        await pool.query(queryText, [id])
        res.sendStatus(204);
    } catch (error) {
        console.log('there was an error DELETING an applications', error)
    }
})

module.exports = router;