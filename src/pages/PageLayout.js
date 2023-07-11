import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";



export function PageLayout(){
    return(
        <div className="flex flex-col h-screen justify-between">
            <Header />
            <Outlet/>
            <Footer />
        </div>
    );
}