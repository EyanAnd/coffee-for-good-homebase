
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
  --newUserTable
 CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "is_admin" boolean DEFAULT false,
    "username" character varying(80) NOT NULL UNIQUE,
    "password" character varying(1000) NOT NULL DEFAULT 0,
    "app_started" boolean DEFAULT false,
    "app_submitted" boolean DEFAULT false
);
 
 
 CREATE TABLE "application" (
	"app_id" SERIAL PRIMARY KEY, 
	"user_id" integer REFERENCES "user",
	"name" VARCHAR(50) NULL,
	"email" VARCHAR(50) NULL,
	"mission" VARCHAR(300) NULL,
	"impact" VARCHAR(500) NULL,
	"values" VARCHAR(500) NULL,
	"previous_partners" VARCHAR(300) NULL,
	"success_stories" VARCHAR(500) NULL,
	"collab" VARCHAR(500) NULL,
	"reporting" VARCHAR(200) NULL,
	"sharing" BOOLEAN DEFAULT true,
	"notes" VARCHAR(300) NULL,
	"approved" BOOLEAN DEFAULT false
);

-- allow for the partner id to be the only referenc for the report table
ALTER TABLE "application" ALTER COLUMN "user_id" SET NOT NULL;

-- create the partner table
 CREATE TABLE partners (
	"partner_id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "user",
	"name" VARCHAR(50),
	"email" VARCHAR(50),
	"mission" VARCHAR(300),
	"impact" VARCHAR(500),
	"values" VARCHAR(500),
	"previous_partners" VARCHAR(300),
	"success_stories" VARCHAR(500),
	"collab" VARCHAR(500),
	"reporting" VARCHAR(200),
	"sharing" BOOLEAN DEFAULT true,
	"notes" VARCHAR(300)
);
    
    -- create the reports table
   CREATE TABLE reports (
   "report_id" SERIAL PRIMARY KEY,
   "partner_id" integer NOT NULL REFERENCES partners,
   "user_id" integer REFERENCES "user",
   "name" VARCHAR(50) NOT NULL,
   "description" VARCHAR(1000) NOT NULL,
   "date_sent" DATE NOT NULL,
   "category" VARCHAR(20) NOT NULL,
   "file_path" BYTEA NULL
   );
   -- alter the table to allow for the date_sent to default to the current date
   ALTER TABLE "reports" ALTER COLUMN date_sent SET DEFAULT CURRENT_DATE;
    
    -- create table for data.
    CREATE TABLE cfg_data (
	"order_id" SERIAL PRIMARY KEY,
	"currency" VARCHAR DEFAULT 'USD',
	"total" integer,
	"fulfillment_status" VARCHAR(10),
	"shipping_method" varchar(50),
	"shipping_state" VARCHAR(255),
	"shipping_country" VARCHAR(255),
	"channel_type" VARCHAR(50),
	"payment_method" VARCHAR(255)
);
-- grab total number of orders per state
SELECT shipping_state, COUNT(*) AS order_count
FROM cfg_data
GROUP BY shipping_state;


-- grabbing the in store, local delivery and shipping orders
SELECT
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
    shipping_method;
-- total amount 
SELECT SUM(total) FROM "cfg_data";

-- total orders
SELECT COUNT(order_id) FROM "cfg_data";

-- number of orders per channel_type
SELECT channel_type, COUNT(*) AS order_count
FROM cfg_data
GROUP BY channel_type;

-- total shipped items per state
SELECT shipping_state, COUNT(*) AS shipment_count
FROM cfg_data
WHERE shipping_method = 'Shipping'
GROUP BY shipping_state;

--contact us form
CREATE TABLE contact_form (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "user",
	"name" varchar(50),
	"email" varchar(50),
	"subject" varchar(100),
	"description" varchar(500)
);

-- Inserting a contact form entry for user ID 1
INSERT INTO contact_form ("user_id", "name", "email", "subject", "description")
VALUES (1, 'John Doe', 'johndoe@example.com', 'General Inquiry', 'Hello, I have a question regarding your products.');

-- Inserting a contact form entry for user ID 2
INSERT INTO contact_form ("user_id", "name", "email", "subject", "description")
VALUES (2, 'Jane Smith', 'janesmith@example.com', 'Order Issue', 'Hi, I have encountered an issue with my recent order.');

-- Inserting a contact form entry without a user ID
INSERT INTO contact_form ("name", "email", "subject", "description")
VALUES ('Anonymous', 'anonymous@example.com', 'Feedback', 'Just wanted to provide some feedback on your services.');

-- Inserting a contact form entry with a longer description
INSERT INTO contact_form ("user_id", "name", "email", "subject", "description")
VALUES (3, 'Mike Johnson', 'mikejohnson@example.com', 'Product Inquiry', 'I would like to know more about the specifications and availability of your latest product lineup. Specifically, I am interested in the features and pricing of the XYZ model. Thank you.');



-- test data for cfg table
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.07, 'FULFILLED', 'Shipping', 'Colorado', 'United States', 'IN_PERSON', 'Stripe');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.18, 'FULFILLED', 'Shipping', 'West Virginia', 'United States', 'EMAIL', 'Stripe');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.86, 'FULFILLED', 'Shipping', 'Florida', 'United States', 'CHAT', 'Google Pay');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.58, 'FULFILLED', 'Shipping', 'California', 'United States', 'IN_PERSON', 'Stripe');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.79, 'FULFILLED', 'Local Delivery', 'Indiana', 'United States', 'IN_PERSON', 'Amazon Pay');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.74, 'FULFILLED', 'Shipping', 'New Jersey', 'United States', 'IN_PERSON', 'Stripe');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.83, 'FULFILLED', 'Shipping', 'Maryland', 'United States', 'IN_PERSON', 'Apple Pay');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.28, 'FULFILLED', 'Shipping', 'Minnesota', 'United States', 'CHAT', 'Amazon Pay');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.24, 'FULFILLED', 'Local Delivery', 'Pennsylvania', 'United States', 'ONLINE', 'Apple Pay');
insert into cfg_data (currency, total, fulfillment_status, shipping_method, shipping_state, shipping_country, channel_type, payment_method) values ('USD', 26.75, 'FULFILLED', 'Local Delivery', 'California', 'United States', 'EMAIL', 'PayPal');

-- short cuts to drop tables if needed
DROP TABLE reports;
DROP TABLE "user";
DROP TABLE partners;
DROP TABLE cfg_data;
DROP TABLE application;
DROP TABLE "contact_form"