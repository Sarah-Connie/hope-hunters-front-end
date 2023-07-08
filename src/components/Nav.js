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
            <div>
            <ul className="bg-blue-300">
                {/* Show home link when not on homepage */}
                <li>
                    {isNotHomePage && (
                        <li>
                        <NavLink to="/">Home</NavLink>
                        </li>
                    )}
                </li>
                {/* report a missing person link shown by default. 
                /Report route to render the login and signup form. */}
                <li>
                <NavLink to="/report">Report a Missing Person</NavLink>
                </li>
            </ul>
            </div>
        ) : (
        // on small screens, show login and signup links and/or home link 
        <div>
            <ul className="bg-blue-300">
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

                {/* signup route will render signup form only */}
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
            </ul>
        </div>
        )}
    </div>
  );
}

export default Nav;
