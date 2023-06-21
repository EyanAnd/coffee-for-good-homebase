const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET to grab application if started
router.get('/', rejectUnauthenticated, async (req, res) => { // TODO replace with req.user
    console.log(req.params)
    const id = req.user.id
    const queryText = `SELECT * FROM "application" WHERE "user_id"=$1;`;
    try {
        const result = await pool.query(queryText, [id])
        if (result.rows.length === 0) {
            const queryText2 = `INSERT INTO "application" ("user_id") VALUES ($1) RETURNING *;`;
            const result2 = await pool.query(queryText2, [id])
            res.send(result2.rows[0]);

        } else {
            console.log(result)
            res.send(result.rows[0])
        }
    } catch (error) {
        console.log('there was an error GETTING the application', error)
        res.sendStatus(500);
    }
})

// router.post to submit an application
router.post('/', (req, res) => {
    console.log(req.params)
    const id = req.user.id
    const checkExistingQuery = `SELECT * FROM "application" WHERE "user_id"=$1;`;
    pool.query(checkExistingQuery, [id]).then(result => {
        if (result.rows.length > 0) {
            return res.sendStatus(400).send('Application already submitted')
        }
    })
    const queryText = `INSERT INTO "application" ("user_id", "name", "email", "mission", "impact", "values", "previous_partners", "success_stories", "collab", "reporting", "sharing", "notes", "approved")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;

    pool.query(queryText, [id, req.body.name, req.body.email, req.body.mission, req.body.impact, req.body.values,
        req.body.previous_partners, req.body.success_stories, req.body.collab, req.body.reporting, req.body.sharing, req.body.notes, req.body.approved]).then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('there was an error POSTING an application', err)
            res.sendStatus(500);
        })
})
// router put to update application
router.put('/', (req, res) => {
    const id = req.user.id;

    const queryText = `UPDATE "application"
    SET "name" = $1,
        "email" = $2,
        "mission" = $3,
        "impact" = $4,
        "values" = $5,
        "previous_partners" = $6,
        "success_stories" = $7,
        "collab" = $8,
        "reporting" = $9,
        "sharing" = $10,
        "notes" = $11,
        "approved" = $12
    WHERE "user_id" = $13;`;

    pool.query(queryText, [
        req.body.name,
        req.body.email,
        req.body.mission,
        req.body.impact,
        req.body.values,
        req.body.previous_partners,
        req.body.success_stories,
        req.body.collab,
        req.body.reporting,
        req.body.sharing,
        req.body.notes,
        req.body.approved,
        id

    ])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log('There was an error UPDATING the application', err);
            res.sendStatus(500);
        });
});


module.exports = router;