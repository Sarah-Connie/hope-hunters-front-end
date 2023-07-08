import { NavLink } from "react-router-dom";
import { Nav } from "./Nav";

export function Header() {

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Render Hope Hunters header at all times with redirect to homepage */}
        <NavLink
          to="/"
          className="text-6xl text-semibold align-middle hover:scale-105 transition-transform duration-300"
        >
          Hope Hunters
        </NavLink>
        {/* Render nav component in header at all times */}
        <Nav />
      </div>
    </div>
  );
}

export default Header;
