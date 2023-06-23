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
import partnerReducer from '../redux/reducers/partner.reducer';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const partner = useSelector(store => store.partnerReducer);
  console.log(partner)
  const isPartner = partner.some((partner) => partner.user_id === user.id)

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
          {isPartner && (
            <>
              <Redirect to="/partner/" />
              <ProtectedRoute
                // logged in partner should be redirected to their home page
                exact
                path="/partner/"
              >
                <PartnerHome />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in admin should only see one their home screen else shows LoginPage
                exact
                path="/partner/reports"
              >
                <PartnerReports />
              </ProtectedRoute>
              <ProtectedRoute
                // logged in shows Contact Us else shows LoginPage
                exact
                path="/contact"
              >
                <ContactUs />
              </ProtectedRoute>
            </>
          )}
          {user.is_admin && (
            <>
              <Redirect to="/admin/" />
              <ProtectedRoute
                // logged in admin should only see one their home screen else shows LoginPage
                exact
                path="/admin/"
              >
                <AdminHome />
              </ProtectedRoute>
              <ProtectedRoute
                // logged in shows Contact Us else shows LoginPage
                exact
                path="/admin/reports"
              >
                <AdminReports />
              </ProtectedRoute>
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/admin/applications"
              >
                <AdminApplicationsTable />
              </ProtectedRoute>
            </>
          )}
          {user.id && (
            <>
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/application"
              >
                <Application />
              </ProtectedRoute>
              <ProtectedRoute
                // logged in shows Contact Us else shows LoginPage
                exact
                path="/contact"
              >
                <ContactUs />
              </ProtectedRoute>
            </>
          )}
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
