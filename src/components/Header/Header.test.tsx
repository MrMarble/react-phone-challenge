import type { Phone } from "@prisma/client";
import { render } from "@testing-library/react";

import { HeaderComponent } from "./Header";

describe("Header component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<HeaderComponent />);

    expect(getByTestId("header")).toBeInTheDocument();
  });
});
