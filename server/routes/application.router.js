const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { useSelector } = require('react-redux');

const router = express.Router();


// GET to grab application if started
router.get('/', rejectUnauthenticated, async (req, res) => {
    const id = req.user.id
    const isAdmin = req.user.is_admin

    const queryText = `SELECT * FROM "application" WHERE "user_id"=$1;`;
    // if the user is an admin don't grab or start a new application
    if(isAdmin) {
        return
    }
    try {
        const result = await pool.query(queryText, [id])
        

        // create a new application for a new user once the create an account
        if (result.rows.length === 0) {
            const queryText2 = `INSERT INTO "application" ("user_id") VALUES ($1) RETURNING *;`;
            const result2 = await pool.query(queryText2, [id])
            res.send(result2.rows[0]);

        } else {
            res.send(result.rows[0])
        }
    } catch (error) {
        console.log('there was an error GETTING the application', error)
        res.sendStatus(500);
    }
})

// router.post to submit an application
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const id = req.user.id
        // check if they already have an exisiting app
        const checkExistingQuery = `SELECT * FROM "application" WHERE "user_id"=$1;`;
        const result1 = await pool.query(checkExistingQuery, [id])
        console.log(result1.rows)
        if (result1.rows.length > 0) {
            res.status(400).send('Application already submitted')
            return;
        }
        const queryText = `INSERT INTO "application" ("user_id", "name", "email", "mission", "impact", "values", "previous_partners", "success_stories", "collab", "reporting", "sharing", "notes", "approved")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
        const result2 = await pool.query(queryText, [id, req.body.name, req.body.email, req.body.mission, req.body.impact, req.body.values,
            req.body.previous_partners, req.body.success_stories, req.body.collab, req.body.reporting, req.body.sharing, req.body.notes, req.body.approved])
        res.send(result2.rows)
        console.log(result2.rows)
    } catch (err) {
        console.log('there was an error POSTING an application', err)
        res.sendStatus(500);
    }
})
// router put to update application
router.put('/', rejectUnauthenticated, (req, res) => {
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