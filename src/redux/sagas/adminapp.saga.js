import axios from "axios";
import { takeLatest, put, takeEvery} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";

function* adminappSaga() {
    // TODO add yields in here
    yield takeLatest('FETCH_ADMIN_APPS', fetchAdminAppsSaga)
}

// fetch saga to grab all the applications for the admin to see
function* fetchAdminAppsSaga() {
    try {
        const response = yield axios.get('/api/admin/applications')
        console.log(response)
        yield put({ type: 'SET_APPS', payload: response.data})
    } catch (error) {
        console.log('there was an error GETTING all the applicaitons for the admin', error)
    }
}

// saga to approve an application

// saga to delete an application


export default adminappSaga;