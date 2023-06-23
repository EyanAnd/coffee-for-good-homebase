import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Nav from './Shared/Nav/Nav';
import Footer from './Shared/Footer/Footer';

import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from './Shared/ProtectedRoute/ProtectedAdminRoute';
import ProtectedPartnerRoute from './Shared/ProtectedRoute/ProtectedPartnerRoute';

import AboutPage from './Pages/AboutPage/AboutPage';
import UserPage from './Pages/UserPage/UserPage';
import ContactUs from './Pages/ContactUs/ContactUs';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import Application from './Pages/Application/Application';
import AdminApplicationsTable from './Pages/Admin/AdminApplicationsTable.jsx/AdminApplicationsTable';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import AdminReports from './Pages/Admin/AdminReports/AdminReports';
import PartnerHome from './Pages/Partner/PartnerHome/PartnerHome';
import PartnerReports from './Pages/Partner/PartnerReports/PartnerReports';
import './App.css';

function App() {
  // initalize dispatch
  const dispatch = useDispatch();

  const user = useSelector(store => store.user); // grab user store
  const partner = useSelector(store => store.partnerReducer); // grab partner store
  const isPartner = partner.some((partner) => partner.user_id === user.id) // check to see if the user also has a partner id 

  // call to grab the user on load of the app.
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* Protected route to render admin home or  user home page*/}
          <ProtectedPartnerRoute
            // logged in partner should be redirected to their home page
            exact
            path="/partner/"
          >
            <PartnerHome />
          </ProtectedPartnerRoute>

          <ProtectedPartnerRoute
            // logged in partner should only see their reports table
            exact
            path="/partner/reports"
          >
            <PartnerReports />
          </ProtectedPartnerRoute>
          <ProtectedPartnerRoute
            // logged in shows Contact Us 
            exact
            path="/contact"
          >
            <ContactUs />
          </ProtectedPartnerRoute>
              <ProtectedAdminRoute
                // logged in admin should only see one their home screen 
                exact
                path="/admin/"
              >
                <AdminHome />
              </ProtectedAdminRoute>
              <ProtectedAdminRoute
                // logged in admin reports page 
                exact
                path="/admin/reports"
              >
                <AdminReports />
              </ProtectedAdminRoute>
              <ProtectedAdminRoute
                // logged in admin can see the applications table
                exact
                path="/admin/applications"
              >
                <AdminApplicationsTable />
              </ProtectedAdminRoute>
          <ProtectedRoute
            // logged in shows Contact Us else shows User Page
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows application page
            exact
            path="/application"
          >
            <Application />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows Contact Us else shows Contact Us page
            exact
            path="/contact"
          >
            <ContactUs />
          </ProtectedRoute>
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >

            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
