import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import HamburgerMenu from "./HamburgerMenu";

export function Nav({isLoggedIn}) {
  const location = useLocation();
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const isHomePage = location.pathname === "/";

  return (
    <div>
        {/* on med/lg screens, show only report a missing link and/or home link */}
        {isMdScreenOrLarger ? (
            <div className="">
            <ul className="text-3xl flex flex-row px-5">
                {/* Show home link when not on homepage */}
                {!isHomePage && (
                  <li className="mr-10">
                    <NavLink to="/">Home</NavLink>
                  </li>
                )}

                {/* if user is logged in, show dashboard, logout, and/or home link from above */}
                {isLoggedIn ? (
            <>
                <li className="mr-10">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                {/* add adjustment to appropriately log user out but direct to homepage 
                need to wait until login functionality is coded */}
                <li>
                  <NavLink to="/">Logout</NavLink>
                </li>
              </>
            ) : (
                // else if user is a public user, show below link
                // /report route directs to page with login and signup forms
              <li>
                <NavLink to="/report">Report a Missing Person</NavLink>
              </li>
            )}
            </ul>
            </div>
        ) : (
        // on small screens, use hamburger menu instead of horizontal nav link options
        <div>
            <HamburgerMenu isLoggedIn={isLoggedIn}/>
        </div>
        )}
    </div>
  );
}

export default Nav;
