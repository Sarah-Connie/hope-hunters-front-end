import { NavLink } from "react-router-dom";
import { Nav } from "./Nav";
import logo from "../assets/images/logo.png";

export function Header() {
  return (
    <div>
      <div className="flex items-center justify-between bg-blue font-main text-white w-screen p-4 md:p-0">
        <div className="flex items-center md:space-x-1">
          <img src={logo} alt="Logo" className="h-20 w-20 md:h-32 md:w-32" />
          <NavLink
            to="/"
            className="font-extrabold text-2xl md:text-5xl align-middle hover:scale-105 transition-transform duration-300"
          >
            Hope Helpers
          </NavLink>
        </div>
        {/* Render nav component in header at all times on all screens */}
        <Nav />
      </div>
    </div>
  );
}

export default Header;
