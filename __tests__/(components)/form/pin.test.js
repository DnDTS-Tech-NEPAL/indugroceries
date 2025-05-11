import "@testing-library/jest-dom";

import { PinInput } from "../../../components";
import { JestFormProvider, renderWithProviders } from "../../../jest";

describe("Pin Input", () => {
  it("renders pin input", () => {
    renderWithProviders(
      <JestFormProvider>
        <PinInput name="pin" />
      </JestFormProvider>
    );
  });
});
