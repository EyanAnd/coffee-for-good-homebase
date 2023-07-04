import axios from "axios";
import { takeLatest, put, takeEvery} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";


function* applicationSaga() {
    yield takeLatest('SUBMIT_APP', addAppSaga);
    yield takeLatest('FETCH_APP', fetchAppSaga);
    yield takeLatest('UPDATE_APP', updateAppSaga)
}

// saga to post the application 
function* addAppSaga(action) {
    try {
        console.log(action.payload)
        
        const response = yield axios.post(`/api/application/`, action.payload)
        console.log(response.data)
        yield put({ type: 'FETCH_APP'})
    } catch (error) {
        console.log('there was an error in the appSaga', error)
        console.log(error)
    }
}
// saga to get the appilcation info to save or go back and edit it.
function* fetchAppSaga() {
    try {
   
        const response = yield axios.get(`/api/application/`); 
        console.log(response.data)
        yield put({ type: 'SET_APP_INFO', payload: response.data});
    
    } catch (error) {
        console.log('there was an error in the fetch app saga', error);
    }
}
// saga to update the applciation with the save application button
function* updateAppSaga(action) {
    try {
        const response = yield axios.put(`/api/application/`, action.payload ) // 
        console.log(response)
        yield put({ type: 'FETCH_APP'})
    } catch (error) {
        console.log('there was an error updating the applicaiton ', error)
    }
}


export default applicationSaga;