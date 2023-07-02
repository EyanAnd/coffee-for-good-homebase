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
router.put('/applications', async (req, res) => {
    try {
      const userId = req.body.user_id;
  
      const queryText1 = 'UPDATE "application" SET "approved"=true WHERE "user_id" = $1;';
      await pool.query(queryText1, [userId]);
  
      // Check if the application was approved
      const queryText2 = 'SELECT * FROM "application" WHERE "user_id" = $1';
      const { rows } = await pool.query(queryText2, [userId]);
      const application = rows[0];
  
      if (application && application.approved) {
        // Create a new partner record
        const queryText3 = `
          INSERT INTO "partners" ("user_id", "name", "email", "mission", "impact", "values", "previous_partners", "success_stories", "collab", "reporting", "sharing", "notes")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;
        const insertValues = [
          userId,
          application.name,
          application.email,
          application.mission,
          application.impact,
          application.values,
          application.previous_partners,
          application.success_stories,
          application.collab,
          application.reporting,
          application.sharing,
          application.notes
        ];
        await pool.query(queryText3, insertValues);
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.log('There was an error updating the approval and creating a new partner:', error);
      res.sendStatus(500);
    }
  });
  
  
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
        // STRETCH reconfigure post to add in a way to auto polulate the partner_id
        const queryText = `INSERT INTO "reports" ("partner_id", "name", "description", "date_sent", "category") VALUES ($1, $2, $3, $4, $5);`;

        await pool.query(queryText, [req.body.partner_id, req.body.name, req.body.description, req.body.date_sent, req.body.category])
        res.sendStatus(201);

    } catch (error) {
        console.log('there was an error POSTING a report', error)
    }
})

// DELETE to delete an application
router.delete('/applications', async (req, res) => {
    try {
        const id = req.body.user_id
        const queryText = `DELETE FROM "application" WHERE "user_id"=$1;`;
        await pool.query(queryText, [id])
        res.sendStatus(204);
    } catch (error) {
        console.log('there was an error DELETING an applications', error)
    }
})

// get to grab the transactional data
router.get('/', async (req, res) => {
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
    const queryText6 = `SELECT COUNT(DISTINCT shipping_state) AS state_count
    FROM cfg_data;`;

    // responses
    const response1 = await pool.query(queryText1)
    const response2 = await pool.query(queryText2)
    const response3 = await pool.query(queryText3)
    const response4 = await pool.query(queryText4)
    const response5 = await pool.query(queryText5)
    const response6 = await pool.query(queryText6)
    
    res.send({
        response1: response1.rows,
        response2: response2.rows,
        response3: response3.rows,
        total_sum: response4.rows[0] || 0,
        total_orders: response5.rows[0] || 0,
        orders_per_channel_type: response6.rows[0] || 0
    })
    } catch (error) {
        console.log('there was an error GETTING ALL THIS', error)
    }
})

router.get('/partners', rejectUnauthenticated, async (req, res) => {
    try {
        const queryText = `SELECT * FROM "partners";`;

        const result = await pool.query(queryText)
        res.send(result.rows)
    } catch (error) {
        console.log('there was an error getting all of the partners', error)
    }
})

module.exports = router;