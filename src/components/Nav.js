import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

export function Nav() {
  const location = useLocation();
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const isHomePage = location.pathname === "/";
  const isNotHomePage = location.pathname !== "/";

  return (
    <div>
        {/* on med/lg screens, show only report a missing link and/or home link */}
        {isMdScreenOrLarger ? (
            <ul>
            <li>
                <NavLink to="/">
                {isNotHomePage ? "Home" : "Report a Missing Person"}
                </NavLink>
            </li>
            
            {/* redirect to report page which has both signup and login forms */}
            {isNotHomePage && (
                <li>
                <NavLink to="/report">Report a Missing Person</NavLink>
                </li>
            )}
            </ul>
        ) : (
        // on small screens, show login and signup links and/or home link 
            <ul>
            {!isHomePage && (
                <li>
                <NavLink to="/">
                    Home
                </NavLink>
                </li>
            )}

            {/* login route will render login form only */}
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>

            {/* signup route will render login form only */}
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
            </ul>
        )}
    </div>
  );
}

export default Nav;
