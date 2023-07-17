import { SignupForm } from "../components/SignupForm";
import { LoginForm } from "../components/LoginForm";

export function ReportPage() {
  return (
    <div className="flex flex-col w-screen lg:flex-row justify-evenly">
        <LoginForm />
      {/* <div className="" style={{ width: "500px" }}> */}
        <SignupForm />
      {/* </div> */}
    </div>
  );
}

export default ReportPage;
