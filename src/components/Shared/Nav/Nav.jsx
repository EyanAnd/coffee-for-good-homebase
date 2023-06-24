import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { theme } from '@chakra-ui/react';

function Nav() {
  // initalize use history
  const history = useHistory(); // initalize dispatch for grabbing the partner
  const dispatch = useDispatch(); // initalize use dispatch
  const user = useSelector((store) => store.user); //  // create store for users to check if the user is logged in and what they get to see.
  const partner = useSelector(store => store.partnerReducer) // create store for partner
  const isPartner = partner.some((partner) => partner.user_id === user.id) // check if the user also has a partner id

  // dispatch a call to grab the partner 
  useEffect(() => {
    dispatch({ type: 'FETCH_USER'})
    dispatch({ type: 'FETCH_PARTNER' })
  }, [])


  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Coffee For Good</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
        {!user.id && <Link className="navLink" to="/about">
          About
        </Link>}

        {/* if a partner is logged in show these links */}
        {isPartner && (
          <>
            <Link className="navLink" to="/partner/">
              Home
            </Link>
            <Link className="navLink" to="/partner/reports">
              Reports
            </Link>
            <Link className="navLink" to="/contact">
              Contact Us
            </Link>

            <LogOutButton className="navLink" onClick={() => history.push('/login')} />
          </>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && !isPartner && !user.is_admin && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            <Link className="navLink" to="/user/contact">
              Contact Us
            </Link>

            <Link className="navLink" to="/application">
              Application
            </Link>

            <LogOutButton className="navLink" onClick={() => history.push('/login')}/>
          </>
        )}
        {/* If the user is an admin show these routes */}
        {user.is_admin && (
          <>
            <Link className="navLink" to="/admin/applications">
              Applications
            </Link>
            <Link className="navLink" to="/admin/reports">
              Reports
            </Link>
            <Link className="navLink" to="/admin/">
              Home
            </Link>
            {/* TODO fix logout. Lots of weird redirects going on right now. */}
            <LogOutButton className="navLink" />
          </>
        )
        }


      </div>
    </div>
  );
}

export default Nav;
