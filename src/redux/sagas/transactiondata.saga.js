import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* transactiondataSaga() {
    // yield here
    yield takeLatest('FETCH_DATA', fetchDataSaga)
}

// fetch the transaction data and update the store.
function* fetchDataSaga() {
    try {
        const response = yield axios.get('/api/admin/')
        console.log(response)
        yield put({ type: 'SET_DATA', payload: response.data})
    } catch (error) {
        console.log('there was an error FETCHing the data', error)
    }
}
export default transactiondataSaga;