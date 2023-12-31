import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import {useSelector} from 'react-redux';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedPartnerRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);
  const partner = useSelector(store => store.partnerReducer) // create store for partner
  const isPartner = partner.some((partner) => partner.user_id === user.id) // check if the user also has a partner id

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedPartnerComponent = component || (() => children);

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id && isPartner ?
        // If the user is logged in, show the protected component
        <ProtectedPartnerComponent />
        :
        // Otherwise, redirect to the Loginpage
        <LoginPage />
      }
    </Route>
  );
}

export default ProtectedPartnerRoute;