const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET FOR ADMIN TO GET ALL OF THE APPLICATIONS
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "application";`;

    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('error GETTING ALL the applications', err)
    })
})

// GET to grab application if started
router.get('/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id
    const queryText = `SELECT * FROM "application" WHERE "user_id"=$1;`;

    pool.query(queryText, [id]).then(result => {
        console.log(result)
        res.send(result.rows)
    }).catch(err => {
        console.log('there was an error GETTING the application', err)
        res.sendStatus(500);
    })
})
// router.post to submit an application
router.post('/application/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id

    const queryText = `INSERT INTO "application ("user_id", "mission", "impact", "values", "previous_partners", "success_stories", "collab", "reporting", "sharing", "notes", "approved")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

    pool.query(queryText, [id, req.body.mission, req.body.impact, req.body.values,
        req.body.previous_partners, req.body.success_stories, req.body.colab, req.body.reporting, req.body.sharing, req.body.notes]).then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log('there was an error POSTING an application', err)
            res.sendStatus(500);
        })
})
// router put to update application
router.put('/:id', (req, res) => {
    const id = req.params.id;

    const queryText = `UPDATE "application"
    SET "mission" = $1,
        "impact" = $2,
        "values" = $3,
        "previous_partners" = $4,
        "success_stories" = $5,
        "collab" = $6,
        "reporting" = $7,
        "sharing" = $8,
        "notes" = $9
    WHERE "user_id" = $10;`;

    pool.query(queryText, [
        req.body.mission,
        req.body.impact,
        req.body.values,
        req.body.previous_partners,
        req.body.success_stories,
        req.body.collab,
        req.body.reporting,
        req.body.sharing,
        req.body.notes,
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