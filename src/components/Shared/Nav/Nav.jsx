import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const partner = useSelector(store => store.partnerReducer)
  const isPartner = partner.some((partner) => partner.user_id === user.id)
  console.log(isPartner)

  // removed useEffect for the nav. 

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

            <LogOutButton className="navLink" />
          </>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && !isPartner && !user.is_admin && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            <Link className="navLink" to="/contact">
              Contact Us
            </Link>

            <Link className="navLink" to="/application">
              Application
            </Link>

            <LogOutButton className="navLink" />
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

            <LogOutButton className="navLink" />
          </>
        )
        }


      </div>
    </div>
  );
}

export default Nav;
