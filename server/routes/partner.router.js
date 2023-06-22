const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET to grab transaction data
router.get('/',rejectUnauthenticated, async (req, res) => {
    try {
        // get total shipping_items per state
        const queryText1 = `SELECT shipping_state, COUNT(*) AS shipment_count
        FROM cfg_data
        WHERE shipping_method = 'Shipping'
        GROUP BY shipping_state;`;
        // get number of orders per channel type
        const queryText2 = `SELECT channel_type, COUNT(*) AS order_count
        FROM cfg_data
        GROUP BY channel_type;`;
        // grabbing the in-store, local delivery and shipping orders per state
        const queryText3 = `SELECT
        CASE
            WHEN shipping_method = 'Local Delivery' THEN 'Local Delivery'
            WHEN shipping_method = 'Shipping' THEN 'Shipping'
            WHEN shipping_method = 'IN_PERSON' THEN 'In-Store Pickup'
        END AS shipping_method,
        COUNT(*) AS order_count
    FROM
        cfg_data
    WHERE
        shipping_method IN ('Local Delivery', 'Shipping', 'IN_PERSON')
    GROUP BY
        shipping_method
    ORDER BY
        shipping_method;`;
    // grabbing the cash total of all the donations
    const queryText4 = `SELECT SUM(total) FROM "cfg_data";`;
    // grabbing the amount of orders total
    const queryText5 = `SELECT COUNT(order_id) FROM "cfg_data";`;
    // grabbing number of orders per channel type.
    const queryText6 = `SELECT channel_type, COUNT(*) AS order_count
    FROM cfg_data
    GROUP BY channel_type;`;

    // responses
    const response1 = await pool.query(queryText1).then()
    const resposne2 = await pool.query(queryText2)
    const response3 = await pool.query(queryText3)
    const resposne4 = await pool.query(queryText4)
    const response5 = await pool.query(queryText5)
    const resposne6 = await pool.query(queryText6)
    
    res.send({
        response1: response1.rows,
        response2: resposne2.rows,
        response3: response3.rows,
        resposne4: resposne4.rows,
        response5: response5.rows,
        resposne6: resposne6.rows
    })
    } catch (error) {
        console.log('there was an error GETTING ALL THIS', error)
    }
})
// GET to partner table to show mission, goals, statistics
router.get('/',rejectUnauthenticated, (req, res) => {
    const id = req.user.id
    const queryText = `SELECT "user_id", "name", "mission", "impact", "values", "collab", "reporting", "notes" FROM "partners" WHERE "partner_id"=$1`

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
router.get('/reports/', rejectUnauthenticated, (req, res) => {
    const id = req.user.id;
    const queryText = `SELECT * FROM "reports" WHERE "partner_id"=$1;`;

    pool.query(queryText, [id]).then(result => {
        res.send(result.rows);
    })
})



module.exports = router;