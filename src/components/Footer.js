import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/images/logo.png";


export function Footer() {
   const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  return (
    <div className="bg-blue font-main text-white w-screen md:px-6">

        {isMdScreenOrLarger ? (
        <div className="flex items-center justify-between h-full">
            <div>
                <p className="text-xs">If this is an emergency, please call 000 immediately.</p>
            </div>
            {/* render logo as a navlink back to homepage */}
            <div>
                <NavLink to="/" className="text-2xl text-semibold flex items-center">
                    <img src={logo} alt="Logo" className="h-24 w-24" />
                </NavLink>
            </div>
            <div className="flex justify-center text-xs">
                <p>&copy; Sarah Landis and Connie Jacques 2023. All rights reserved.</p>
            </div>
        </div>
        ) : (
        // on small screens, orient vertically 
        <div className="flex flex-col items-center justify-center">
            <p className="text-xs pt-2">If this is an emergency, please call 000 immediately.</p>
            {/* render logo as a navlink back to homepage */}
            <div className="">
                <NavLink to="/" className="text-xl text-semibold">
                    <img src={logo} alt="Logo" className="h-24 w-24" />
                </NavLink>
            </div>
            <div className="flex justify-center text-center text-xs pb-2">
                <p>&copy; Sarah Landis and Connie Jacques 2023. All rights reserved.</p>
            </div>
        </div>
        )}
    </div>
  );
}

export default Footer;
