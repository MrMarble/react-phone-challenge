import type { Phone } from "@prisma/client";
import { render } from "@testing-library/react";

import { Header } from "./index";

describe("Header component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Header />);

    expect(getByTestId("header")).toBeInTheDocument();
  });
});
