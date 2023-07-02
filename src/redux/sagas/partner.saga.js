import axios from "axios";
import { takeLatest, put, takeEvery, take} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";

function* partnerWatcherSaga() {
// yields here
yield takeLatest('FETCH_PARTNER', fetchPartner)
}

// fetch current partner
function* fetchPartner() {
    try {
        const response = yield axios.get('/api/partner/info')
        console.log(response)
        yield put({ type: 'SET_PARTNER', payload: response.data})
        console.log(response.data)
    } catch (error) {
        console.log('there was an error getting the current partner')
    }
}

export default partnerWatcherSaga