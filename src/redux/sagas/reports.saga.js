import axios from "axios";
import { takeLatest, put, takeEvery, take} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";

function* reportsSaga() {
    // yields here
    yield takeLatest('FETCH_REPORTS', fetchReportsSaga)
    yield takeLatest('ADD_REPORT', addReportSaga)
    // yield takeLatest('FETCH_PARTNER_REPORTS', fetchPartnerReports)
    
}

// grab reports for the reports table
function* fetchReportsSaga() {
    try {
        const response = yield axios.get('/api/admin/reports')
        console.log(response)
        yield put({ type: 'SET_REPORTS', payload: response.data})
    } catch (error) {
         console.log('there was an error fetching the reports')
    }
}

// add a report
function* addReportSaga() {
    try {
        const response = yield axios.post('/api/admin/reports')
        console.log(response)
        yield put({ type: 'FETCH_REPORTS' })
    } catch (error) {
        console.log('there was an error in the add report saga', error)
    }
}

function* fetchPartnerReports() {
    try {
        const response = yield axios.get('/api/partner/reports/')
        console.log(response)
        yield put({ type: 'SET_PARTNER_REPORTS', payload: response.data}) // set partnerReports reducer
    } catch (error) {
        console.log('there was an error getting the reports for the partner', error)
    }
}

export default reportsSaga;