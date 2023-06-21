import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // initalize use selector to check if form exist and conditionally render the status of the application
  
  const doesFormExist = useSelector(store => store.existanceReducer)
  // init useHistory
  const history = useHistory();

  

  // function to give applicationa a rendering status
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {doesFormExist ? <p>Application Status: Started</p> : <p>Application Status Not Started</p>}
      {doesFormExist ? <button onClick={() => history.push('/application')} className='app-btn'>Continue Application</button> :
      <button onClick={() => history.push('/application')} className='app-btn'>Start Application</button>}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
