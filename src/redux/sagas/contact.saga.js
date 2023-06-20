import axios from "axios";
import { takeLatest, put} from 'redux-saga/effects'


function* userWatcherSaga() {
    yield takeLatest('CONTACT_ADMIN', addContactSaga);
}

function* addContactSaga(action) {
    try {
        yield axios.post('/api/contact/', action.payload)
        yield put({ type: 'SET_CONTACT_INFO' })
    } catch (error) {
        console.log('there was an error in the contactSaga', error)
    }
}


export default userWatcherSaga;