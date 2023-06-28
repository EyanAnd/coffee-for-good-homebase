import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// update submit app saga
function* updateUserSubmitSaga(action) {
  try {
    console.log(action.payload)
    const response = yield axios.put('/api/user/application_submitted', {id: action.payload})
 
    yield put({ type: 'FETCH_USER'})
  } catch (error) {
    console.log('there was an error in the update submit user application saga', error)
  }
}

function* updateUserStartedSaga(action) {
  try {
    const response = yield axios.put('/api/user/application_started', {id: action.payload})
    
    yield put({ type: 'FETCH_USER'})
  } catch (error) {
    console.log('there was an error in the update submit user application saga', error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('IS_SUBMITTED', updateUserSubmitSaga);
  yield takeLatest('IS_STARTED', updateUserStartedSaga);
}

export default userSaga;
