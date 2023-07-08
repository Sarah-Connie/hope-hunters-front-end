import { useState, useEffect } from "react";

function HamburgerMenu() {

const [isNavOpen, setIsNavOpen] = useState(false);

useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isNavOpen]);

return (
<div className="lg:hidden flex items-center justify-between py-8">
    <nav>
        <section className="flex md:hidden">
            <div
            className="space-y-2 transition-all duration-300"
            onClick={() => setIsNavOpen((prev) => !prev)}
            >
                <span className="block h-0.5 w-8 bg-black"></span>
                <span className="block h-0.5 w-8 bg-black"></span>
                <span className="block h-0.5 w-8 bg-black"></span>
            </div>
            
            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                    className="absolute top-0 right-0 px-8 py-8"
                    onClick={() => setIsNavOpen(false)}
                >
                    <svg
                    className="h-8 w-8 text-black"
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
                <ul className="flex flex-col items-center justify-between min-h-[250px] font-poppins font-extralight text-xl">
                    <li className="border-b border-black mb-8 uppercase">
                    <a href="/login">Login</a>
                    </li>
                    <li className="border-b border-black my-8 uppercase">
                    <a href="/signup">Sign Up</a>
                    </li>
                    <li className="border-b border-black my-8 uppercase">
                    <a href="/">Home</a>
                    </li>
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
            position: absolute;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            background: white;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        `}
    </style>
</div>
  );
}


export default HamburgerMenu;
