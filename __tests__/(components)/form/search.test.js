import "@testing-library/jest-dom";

import { SearchInput } from "../../../components";
import { JestFormProvider, renderWithProviders } from "../../../jest";

describe("Search Input", () => {
  it("renders search input", () => {
    renderWithProviders(
      <JestFormProvider>
        <SearchInput name="search" />
      </JestFormProvider>
    );
  });
});
