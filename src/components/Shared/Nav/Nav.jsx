import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

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
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* TODO you will have to do this with the partner home route to */}
            {user.is_admin ? <Link className="navLink" to="/admin/">
              Home
            </Link> : <Link className="navLink" to="/user">
              Home
            </Link>}

            {!user.is_admin && <Link className="navLink" to="/contact">
              Contact Us
            </Link>}

            {!user.is_admin && <Link className="navLink" to="/application">
              Application
            </Link>}
            {user.is_admin && (
              <>
                <Link className="navLink" to="/admin/applications">
                  Applications
                </Link>

                <Link className="navLink" to="/admin/reports">
                  Reports
                </Link>
              </>
            )}
            <LogOutButton className="navLink" />
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
