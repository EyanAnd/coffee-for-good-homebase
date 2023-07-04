import axios from "axios";
import { takeLatest, put, takeEvery, take} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";

function* partnerReportsSaga() {
    yield takeLatest('FETCH_PARTNER_REPORTS', fetchPartnerReports)
}

// get the reports that match the current partner that is set in the partner reducer
function* fetchPartnerReports(action) {
    try {
        const response = yield axios.get('/api/partner/reports', {params: action.payload})
        console.log(response)
        yield put({ type: 'SET_PARTNER_REPORTS', payload: response.data}) // set partnerReports reducer
    } catch (error) {
        console.log('there was an error getting the reports for the partner', error)
    }
}

export default partnerReportsSaga