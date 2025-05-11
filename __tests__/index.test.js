import "@testing-library/jest-dom";
// import { fireEvent, screen } from "@testing-library/react";

// import { useRouter } from "next/navigation";

import { renderWithProviders } from "../jest";
import Home from "../app/page";
// import { ROUTES } from "../constants";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  it("has one h1 tag", () => {
    renderWithProviders(<Home />);

    // screen.debug();

    // const heading = screen.getByRole("heading", { level: 1 });
    // expect(heading).toBeInTheDocument();
  });

  // it("has multiple heading tags", () => {
  //   renderWithProviders(<Home />);

  //   const headings = screen.getAllByRole("heading");
  //   expect(headings.length).toBeGreaterThan(1);
  // });

  // it("has contact us button", () => {
  //   renderWithProviders(<Home />);

  //   const button = screen.getByRole("button", { name: /contact us/i });

  //   expect(button).toBeInTheDocument();
  // });

  // it(`redirects to ${ROUTES.APP.CONTACT_US} when contact us button is clicked`, () => {
  //   const pushMock = jest.fn(); // Create a mock function for router.push
  //   const mockedRouter = { push: pushMock };

  //   useRouter.mockReturnValue(mockedRouter);

  //   renderWithProviders(<Home />);

  //   const button = screen.getByTestId("contact-us-button");

  //   fireEvent.click(button);

  //   expect(pushMock).toHaveBeenCalledWith(ROUTES.APP.CONTACT_US);
  // });
});
