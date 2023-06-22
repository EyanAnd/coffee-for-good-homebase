import axios from "axios";
import { takeLatest, put, takeEvery, take} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";

function* adminReportsSaga() {
    // yields here
    yield takeLatest('FETCH_REPORTS', fetchReportsSaga)
    yield takeLatest('ADD_REPORT', addReportSaga)
    
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

export default adminReportsSaga;