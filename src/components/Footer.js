import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export function Footer() {
   const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });


  return (
    <div className="bg-blue text-white w-screen p-6">
        {isMdScreenOrLarger ? (
        <div className="flex items-center justify-center md:justify-between">
            <div>
                <p className="text-xs">If this is an emergency, please call 000 immediately.</p>
            </div>
            <div>
                {/* Render Hope Hunters header at all times with redirect to homepage */}
                <NavLink
                to="/"
                className="text-xl md:text-2xl text-semibold"
                >
                Hope Hunters
                </NavLink>
            </div>            
        </div>) : (
        <div>
            <div className="flex justify-center">
                <p className="text-xs">If this is an emergency, please call 000 immediately.</p>
            </div>
            <div>
            {/* Render Hope Hunters header at all times with redirect to homepage */}
            <NavLink
            to="/"
            className="text-xl md:text-2xl text-semibold flex justify-center"
            >
            Hope Hunters
            </NavLink>
            </div>
        </div>)}
        <div className="flex justify-center md:justify-end text-xs">
            <p>Copyright Sarah Landis and Connie Jacques. 2023.</p>
        </div>
    </div>
  );
}

export default Footer;
