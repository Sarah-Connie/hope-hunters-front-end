import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Header } from "../components/Header"
import AuthProvider from "../components/AuthContext";

describe("Header Component Rendering Tests", () => {
  test("renders the Hope Helpers header element", () => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );

    const headerElement = screen.getByText(/Hope Helpers/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the Nav component in the Header component", () => {
    render(
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
    );

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("displays the correct navigational link in the Header component", () => {
    render(
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
    );

    const homeLink = screen.getByRole("link", { name: /Hope Helpers/i });
    expect(homeLink).toBeInTheDocument();
  });

  test("navigates to the homepage when clicking the Hope Helpers wording", () => {
    render(
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
    );

    const headerElement = screen.getByText(/Hope Helpers/i);
    userEvent.click(headerElement);

    expect(window.location.pathname).toBe("/");
  });

});
