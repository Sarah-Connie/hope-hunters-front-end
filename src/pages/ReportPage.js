import { SignupForm } from "../components/SignupForm";
import { LoginForm } from "../components/LoginForm";

export function ReportPage(){
    return (
        <div className="flex flex-row w-screen justify-evenly">
            <LoginForm />
            <SignupForm />
        </div>
        );
    }
    
    export default ReportPage;