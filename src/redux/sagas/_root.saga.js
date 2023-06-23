import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import contactUsSaga from './contact.saga';
import applicationSaga from './application.saga';
import adminApplicationSaga from './adminApplication';
import transactionDataSaga from './transactionData.saga';
import reportsSaga from './reports.saga';
import partnerWatcherSaga from './partner.saga';
import partnerReportsSaga from './partnerReports.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    contactUsSaga(), // runs all dispatches and requests for the contact us page
    applicationSaga(), // runs all dispatches and request for the user application saga
    adminApplicationSaga(), // runs all dispatches and requests for the admin applicatios saga
    transactionDataSaga(), // get transactional data to partners and admin
    reportsSaga(), // runs all dispatches and requests for the reports saga
    partnerWatcherSaga(), // runs dispatches for to check if the user is a partner on load of the page
    partnerReportsSaga() // dispatches and requests for particular parnter reports

  ]);
}
