import "@testing-library/jest-dom";

import { QuantityInput } from "../../../components";
import { JestFormProvider, renderWithProviders } from "../../../jest";

describe("Quantity Input", () => {
  it("renders quantity input", () => {
    renderWithProviders(
      <JestFormProvider>
        <QuantityInput />
      </JestFormProvider>
    );
  });
});
