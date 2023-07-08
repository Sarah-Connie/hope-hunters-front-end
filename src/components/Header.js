import { NavLink } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
// import HamburgerMenu from './HamburgerMenu';
import { useMediaQuery } from 'react-responsive';

export function Header() {
    // const location = useLocation();
    // if (location.pathname !== '/') {
    //     return null; // Hide the header on routes other than "/"
    // }

    // const isHomePage = location.pathname === "/";
    const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

    return (
        <div>
        {isMdScreenOrLarger ? (
        <div className="flex items-center align-middle justify-between">
            <NavLink
                to="/"
                className="text-6xl pt-5 text-semibold align-middle hover:scale-105 transition-transform duration-300"
            >
                Hope Hunters
            </NavLink>
        </div>) : 
        (
            <div className="flex items-center align-middle justify-between">
            <NavLink
                to="/"
                className="text-lg font-extralight align-middle hover:scale-105 transition-transform duration-300"
            >
                Hope Hunters
            </NavLink>
            <div className="">
                {/* <HamburgerMenu /> */}
            </div>
        </div>
        )}
        </div>
    );
}
