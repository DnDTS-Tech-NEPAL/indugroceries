import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { TextFieldInput } from "../../../components";
import { renderWithProviders, JestFormProvider } from "../../../jest";

describe("TextField", () => {
  it("renders text field", () => {
    renderWithProviders(
      <JestFormProvider>
        <TextFieldInput name="username" />
      </JestFormProvider>
    );
  });

  it("renders label correcly", () => {
    renderWithProviders(
      <JestFormProvider>
        <TextFieldInput name="username" label="Username" />
      </JestFormProvider>
    );

    const usernameLabel = screen.getByText("Username");
    expect(usernameLabel).toBeInTheDocument();
  });

  it("handles the disabled state", () => {
    renderWithProviders(
      <JestFormProvider>
        <TextFieldInput name="username" label="Username" disabled />
      </JestFormProvider>
    );

    const textField = screen.getByRole("textbox");
    expect(textField).toBeDisabled();
  });

  it("inserts the startElement in the textfield", () => {
    renderWithProviders(
      <JestFormProvider>
        <TextFieldInput
          name="username"
          label="Username"
          startElement={<p>Hello</p>}
        />
      </JestFormProvider>
    );

    const startElement = screen.getByText(/hello/i);
    expect(startElement).toBeInTheDocument();
  });

  it("inserts the endElement in the textfield", () => {
    renderWithProviders(
      <JestFormProvider>
        <TextFieldInput
          name="username"
          label="Username"
          endElement={<p>Bye</p>}
        />
      </JestFormProvider>
    );

    const endElement = screen.getByText(/bye/i);
    expect(endElement).toBeInTheDocument();
  });
});
