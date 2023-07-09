import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Header } from "../components/Header"

describe("Header Component Rendering Tests", () => {
  it("renders the Hope Hunters header element", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const headerElement = screen.getByText(/Hope Hunters/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the Nav component in the Header component", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("navigates to the homepage when clicking the Hope Hunters header", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const headerElement = screen.getByText(/Hope Hunters/i);
    userEvent.click(headerElement);

    expect(window.location.pathname).toBe("/");
  });

  it("displays the correct navigational link in the Header component", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const homeLink = screen.getByRole("link", { name: /Hope Hunters/i });
    expect(homeLink).toBeInTheDocument();
  });

});
