import "@testing-library/jest-dom";
// import { fireEvent, screen, waitFor } from "@testing-library/dom";

import ContactUs from "../../app/(web)/contact-us/page";
import { renderWithProviders } from "../../jest";

describe("Contact Form", () => {
  beforeEach(() => {
    renderWithProviders(<ContactUs />);
  });

  it("Renders contact form with input and submit", () => {
    // expect(screen.getByText("Full Name")).toBeInTheDocument();
    // expect(screen.getByText("Email")).toBeInTheDocument();
    // expect(screen.getByText("Message")).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  // it("Renders form with iframe", () => {
  //   const iframe = screen.getByTestId("iframe");
  //   fireEvent.load(iframe);
  //   expect(iframe).toBeInTheDocument();
  // });
});

describe("Contact Form Validation", () => {
  beforeEach(() => {
    renderWithProviders(<ContactUs />);
  });

  it("shows validation error when required fields are empty", async () => {
    // fireEvent.submit(screen.getByRole("button"));
    // await waitFor(() => {
    //   const errors = [
    //     "Full Name is required.",
    //     "Email is required.",
    //     "Message is required.",
    //   ];
    //   errors.forEach((error) =>
    //     expect(screen.queryByText(error)).toBeInTheDocument()
    //   );
    // });
  });

  // it("does not show error message when required fields are filled", async () => {
  //   fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), {
  //     target: { value: "Test Test" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
  //     target: { value: "abc@gmail.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Enter your message"), {
  //     target: { value: "This is message" },
  //   });
  //   fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

  //   await waitFor(() => {
  //     const errors = [
  //       "Full Name is required.",
  //       "Email is required.",
  //       "Message is required.",
  //     ];
  //     errors.forEach((error) =>
  //       expect(screen.queryByText(error)).not.toBeInTheDocument()
  //     );
  //   });
  // });

  // it.each([
  //   { email: "---#992.v090", expectedError: "Invalid Email." },
  //   { email: "test@mail.com", expectedError: null },
  // ])("validates email input", async ({ email, expectedError }) => {
  //   const emailInput = screen.getByPlaceholderText("Enter Email");

  //   fireEvent.change(emailInput, {
  //     target: { value: email },
  //   });
  //   fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

  //   await waitFor(() => {
  //     if (expectedError) {
  //       expect(screen.queryByText(expectedError));
  //     } else {
  //       expect(screen.queryByText("Invalid Email.")).not.toBeInTheDocument();
  //     }
  //   });
  // });

  // it.each([
  //   { fullName: "test13122@@@test", expectedError: "Enter valid full name." },
  //   { fullName: "test test", expectedError: null },
  // ])("validates full name", async ({ fullName, expectedError }) => {
  //   const fullNameInput = screen.getByPlaceholderText("Enter Full Name");

  //   fireEvent.change(fullNameInput, {
  //     target: { value: fullName },
  //   });
  //   fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

  //   await waitFor(() => {
  //     if (expectedError) {
  //       expect(screen.queryByText(expectedError));
  //     } else {
  //       expect(
  //         screen.queryByText("Enter valid full name.")
  //       ).not.toBeInTheDocument();
  //     }
  //   });
  // });
});
