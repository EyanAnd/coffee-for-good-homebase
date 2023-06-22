import axios from "axios";
import { takeLatest, put, takeEvery} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";

function* adminappSaga() {
    // TODO add yields in here
    yield takeLatest('FETCH_ADMIN_APPS', fetchAdminAppsSaga)
    yield takeLatest('APPROVE_APP', approveSaga)
    yield takeLatest('DELETE_APP', deleteAppSaga)
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
function* approveSaga() {
    try {
        const response = yield axios.put('/api/applications')
        console.log(response)
        yield put({ type: 'FETCH_ADMIN_APPS' })
    } catch (error) {
        console.log('there was an error approving the app', error)
    }
}
// saga to delete an application
function* deleteAppSaga() {
    try {
        const response = yield axios.delete('/api/admin/applications')
        console.log(response)
        yield put({ type: 'FETCH_ADMIN_APPS' })
    } catch (error) {
        console.log('there was an error deleting the application')
    }
}


export default adminappSaga;