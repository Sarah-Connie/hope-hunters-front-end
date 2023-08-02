import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const location = useLocation();

  const { isLoggedIn, logout } = useAuth();


  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isNavOpen]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`lg:hidden ${isScrolled ? "fixed bottom-6 right-4" : ""}`}>
      <nav>
        <section className="flex md:hidden">
          {/* styling for the hamburger "icon" */}
          <div
            className={`space-y-2 transition-all duration-300 relative ${
              isScrolled ? "z-50 bg-orange border border-lightblue rounded-full h-full w-full p-3" : ""
            }`}
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className={`block h-0.5 w-8 bg-white ${isScrolled ? "h-0.5 w-7" : ""}`}></span>
            <span className={`block h-0.5 w-8 bg-white ${isScrolled ? "h-0.5 w-7" : ""}`}></span>
            <span className={`block h-0.5 w-8 bg-white ${isScrolled ? "h-0.5 w-7" : ""}`}></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
            className={`absolute ${isScrolled && isNavOpen ? "right-4 bottom-4" : isNavOpen ? "right-4 top-4" : ""} z-50 transition-all duration-300`}
            onClick={() => setIsNavOpen(false)}
            >
              {/* styling for the x icon */}
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className={`flex flex-col items-center justify-between min-h-[250px] text-xl text-white ${isScrolled && isNavOpen && isHome ? "mt-32 z-50" : ""}`}>
              {/* if user is logged in display only dashboard and logout links.
              conditional home link rendered thru general nav */}
              {isLoggedIn ? (
                <>
                 <li className="border-b border-white mb-8 uppercase">
                    <NavLink
                      to="/"
                      onClick={handleLinkClick}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="border-b border-white my-8 uppercase">
                    <NavLink
                      to="/dashboard"
                      onClick={handleLinkClick}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="border-b border-white my-8 uppercase">
                  <NavLink to="/" 
                    onClick={() => { 
                      setIsNavOpen(false); 
                      logout(); }}
                    >
                    Logout
                  </NavLink>
                  </li>
                </>
              ) : (
                <>
                {/* else render login, signup, and home links by default */}
                  <li className="border-b border-white mb-8 uppercase">
                    <NavLink
                      to="/login"
                      onClick={handleLinkClick}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="border-b border-white my-8 uppercase">
                    <NavLink
                      to="/signup"
                      onClick={handleLinkClick}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="border-b border-white my-8 uppercase">
                    <NavLink
                      to="/"
                      onClick={handleLinkClick}
                    >
                      Home
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: fixed;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: #05548B;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default HamburgerMenu;
