const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const applicationRouter = require('./routes/application.router')
const partnerRouter = require('./routes/partner.router');
const adminRouter = require('./routes/admin.router')
const contactRouter = require('./routes/contact.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


/* Routes */
app.use('/api/user', userRouter);
app.use('/api/application', applicationRouter)
app.use('/api/partner', partnerRouter)
app.use('/api/admin', adminRouter)
app.use('/api/contact', contactRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;