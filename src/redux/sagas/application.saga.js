import axios from "axios";
import { takeLatest, put, takeEvery} from 'redux-saga/effects'
import errorsReducer from "../reducers/errors.reducer";


function* applicationSaga() {
    yield takeLatest('SUBMIT_APP', addAppSaga);
    yield takeLatest('FETCH_APP', fetchAppSaga);
    yield takeLatest('UPDATE_APP', updateAppSaga)
}

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

function* fetchAppSaga() {
    try {
   
        const response = yield axios.get(`/api/application/`); 
        console.log(response.data)
        yield put({ type: 'SET_APP_INFO', payload: response.data});
    
    } catch (error) {
        console.log('there was an error in the fetch app saga', error);
    }
}

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