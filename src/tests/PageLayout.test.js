import { render, screen } from "@testing-library/react";
import { PageLayout } from "../pages/PageLayout";
import { BrowserRouter as Router, Outlet } from "react-router-dom";

describe("PageLayout Component Tests", () => {

  test("renders the Header component", () => {
    render(
    <Router>
        <PageLayout />
    </Router>
    );
    const headerElement = screen.getByText(/Hope Hunters/i);
    expect(headerElement).toBeInTheDocument();
  });

  // UNCOMMENT when Footer component is actually written 
//   test("renders the Footer component", () => {
//    <Router>
//      <PageLayout />
//    </Router>);
//     const footerElement = screen.getByText(/Hope Hunters/i);
//     expect(footerElement).toBeInTheDocument();
//   });

});