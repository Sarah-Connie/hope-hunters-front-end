import { render, screen } from "@testing-library/react";
import { PageLayout } from "../pages/PageLayout";
import { BrowserRouter as Router} from "react-router-dom";
import AuthProvider from "../components/AuthContext";

describe("PageLayout Component Tests", () => {

  test("renders the Header component", () => {
    render(
    <Router>
      <AuthProvider>
        <PageLayout />
      </AuthProvider>
    </Router>
    );
    const headerElement = screen.getByText(/Hope Helpers/i);
    expect(headerElement).toBeInTheDocument();
  });

  // UNCOMMENT when Footer component is actually written 
  test("renders the Footer component", () => {
    render(
    <Router>
      <AuthProvider>
        <PageLayout />
      </AuthProvider>
    </Router>
    );
    const footerElement = screen.getByText(/Hope Helpers/i);
    expect(footerElement).toBeInTheDocument();
    expect(screen.getByText("Contact us at hopehelpersaus@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("If this is an emergency, please call 000 immediately.")).toBeInTheDocument();
  });

});