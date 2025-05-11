import "@testing-library/jest-dom";

import { PasswordInput } from "../../../components";
import { JestFormProvider, renderWithProviders } from "../../../jest";

describe("Password Input", () => {
  it("renders the password input", () => {
    renderWithProviders(
      <JestFormProvider>
        <PasswordInput name="password" />
      </JestFormProvider>
    );
  });
});
