import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { useAuth } from "./AuthContext";
import HamburgerMenu from "./HamburgerMenu";


export function Nav() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const linkStyle = "flex items-center p-2 border hover:scale-105 transition-transform duration-300"
  const isHomePage = location.pathname === "/";

  return (
    <div>
        {/* on med/lg screens, show only report missing link and/or home link */}
        {isMdScreenOrLarger ? (
            <div className="">
                {/* possibly change to 2xl depending on how other links render when loggedin */}
                <ul className="text-3xl flex flex-row px-5 text-center">
                    {/* Show home link when not on homepage */}
                    {!isHomePage && (
                    <li className={`mr-10 ${linkStyle}`}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    )}

                    {/* if user is logged in, show dashboard, logout, and/or home link from above */}
                    {isLoggedIn ? (
                <>
                    <li className={`mr-10 ${linkStyle}`}>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    {/* add adjustment to appropriately log user out but direct to homepage 
                    need to wait until login functionality is coded */}
                    <li className={`${linkStyle}`}>
                    <NavLink to="/" onClick={logout}>Logout</NavLink>
                    </li>
                </>
                ) : (
                    // else if user is a public user, show below link
                    // /report route directs to page with login and signup forms
                <li className={`${linkStyle}`}>
                    <NavLink to="/report">Report Missing Person</NavLink>
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
